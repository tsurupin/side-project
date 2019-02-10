defmodule Db.Users.Users do
  @moduledoc """
  A context that is responsible fo user related data
  """
  import Ecto.Query, warn: false
  import Geo.PostGIS
  alias Ecto.Multi

  alias Db.Repo
  alias Db.Skills.{UserSkill, UserSkills, Skill}
  alias Db.Genres.Genre
  alias Db.OccupationTypes.OccupationType
  alias Db.Users.{User, Photo, Favorite, UserLike}
  alias Db.Uploaders.UserPhotoUploader

  @spec get_by(%{id: integer}) :: {:ok, User.t()} | {:error, :not_found}
  def get_by(%{id: id}) do
    case Repo.get(User, id) do
      %User{} = user -> {:ok, user}
      _ -> {:error, :not_found}
    end
  end

  @spec liked(integer) :: [User.t()] | []
  def liked(user_id) do
    Repo.all(
      from(
        u in User,
        join: l in UserLike,
        where:
          l.user_id == u.id and l.target_user_id == ^user_id and l.status == ^:requested and
            is_nil(l.deleted_at)
      )
    )
  end

  @spec has_liked(%{user_id: integer, target_user_id: integer}) :: boolean()
  def has_liked(%{user_id: user_id, target_user_id: target_user_id}) do
    Repo.exists?(
      from(
        u in User,
        join: ul in UserLike,
        where:
          ul.user_id == u.id and ul.user_id == ^user_id and ul.target_user_id == ^target_user_id and
            ul.status in [^:requested, ^:approved, ^:rejected] and is_nil(ul.deleted_at)
      )
    )
  end

  @spec edit(User.t(), map()) :: {:ok, any} | {:error, Ecto.Multi.name(), any()}
  def edit(%User{} = user, user_input) do
    transaction =
      Multi.new()
      |> Multi.update(:user, User.edit_changeset(user, user_input))
      |> Multi.merge(fn _ ->
        UserSkills.build_upsert_user_skills_multi(user.id, user_input[:skill_ids] || [])
      end)
      |> Repo.transaction()

    case transaction do
      {:ok, %{user: edited_user}} ->
        {:ok, edited_user}

      {:error, _name, changeset, _prev} ->
        {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec search(%{conditions: map, user_id: integer}) :: {:ok, [User.t()]} | {:ok, []}
  def search(%{conditions: conditions, user_id: user_id}),
    do: search(%{query: base_search_query(user_id), conditions: conditions})

  @spec search(%{query: Ecto.Queryable.t(), conditions: map}) :: {:ok, [User.t()]} | {:ok, []}
  def search(%{query: query, conditions: conditions}) do
    users = Repo.all(build_queries(query, conditions))
    {:ok, users}
  end

  @main_photo_rank 0
  @spec main_photo(integer) :: Photo.t() | no_return
  def main_photo(user_id) do
    Repo.one(
      from(p in Photo,
        where: p.user_id == ^user_id and p.rank == ^@main_photo_rank and is_nil(p.deleted_at)
      )
    )
  end

  @spec with_associations(integer, [Atom.t()]) :: User.t()
  def with_associations(user_id, associations) when is_integer(user_id) do
    User
    |> where(id: ^user_id)
    |> preload_alive_associations(associations)
    |> Repo.one()
  end

  @spec with_associations([integer], [Atom.t()]) :: [User.t()]
  def with_associations(user_ids, associations) when is_list(user_ids) do
    User
    |> where([u], u.id in ^user_ids)
    |> preload_alive_associations(associations)
    |> Repo.all()
  end

  @spec preload_alive_associations(Ecto.Queryable.t(), [Atom.t()]) :: Ecto.Queryable.t()
  def preload_alive_associations(query, associations) do
    Enum.reduce(associations, query, fn association, acc ->
      case association do
        :photos -> preload(acc, photos: ^from(p in Photo, where: is_nil(p.deleted_at)))
        :genre -> preload(acc, [:genre])
        :skills -> preload(acc, skills: ^from(s in Skill, join: us in assoc(s, :user_skills),where: is_nil(us.deleted_at)))
        :city -> preload(acc, [:city])
        :occupation_type -> preload(acc, [:occupation_type])
      end
    end)
  end

  @spec base_search_query(integer) :: Ecto.Queyable.t()
  defp base_search_query(user_id) do
    from(
      u in User,
      left_join: ul in UserLike,
      on:
        (ul.target_user_id == u.id and ul.user_id == ^user_id) or
          (ul.target_user_id == ^user_id and ul.user_id == u.id),
      where: is_nil(ul.id) and u.id != ^user_id and is_nil(ul.deleted_at)
    )
  end

  @active_duration_days 60 * 60 * 24 * 3
  @limit_num 15
  @srid 4326
  @spec build_queries(Ecto.Queryable.t(), map) :: Ecto.Queyable.t()
  defp build_queries(query, conditions) do
    Enum.reduce(conditions, query, fn
      {:genre_id, genre_id}, queries ->
        from(u in queries, where: u.genre_id == ^genre_id)

      {:occupation_type_id, occupation_type_id}, queries ->
        from(u in queries, where: u.occupation_type_id == ^occupation_type_id)

      {:is_active, true}, queries ->
        from(
          u in queries,
          where:
            u.last_activated_at >
              ^NaiveDateTime.add(NaiveDateTime.utc_now(), -@active_duration_days, :second)
        )

      {:skill_ids, skill_ids}, queries ->
        from(
          u in queries,
          join: us in UserSkill,
          where: us.user_id == u.id and us.skill_id in ^skill_ids and is_nil(us.deleted_at)
        )

      {:location, %{distance: distance, latitude: latitude, longitude: longitude}}, queries ->
        geo = %Geo.Point{coordinates: {latitude, longitude}, srid: @srid}

        from(u in queries, where: st_dwithin_in_meters(u.geom, ^geo, ^distance))

      _, queries ->
        queries
    end)
    |> limit(@limit_num)
  end
end
