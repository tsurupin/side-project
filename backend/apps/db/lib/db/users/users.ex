defmodule Db.Users.Users do
  @moduledoc """
  The Accoutns context.
  """
  import Ecto.Query, warn: false
  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]
  import Geo.PostGIS
  alias Ecto.Multi

  alias Db.Repo
  alias Db.Skills.UserSkill
  alias Db.Genres.Genre
  alias Db.OccupationTypes.OccupationType
  alias Db.Users.{User, Photo, Favorite, UserLike}
  alias Db.Uploaders.UserPhotoUploader

  @spec get_by(%{id: integer}) :: {:ok, User.t()} | {:error, :not_found}
  def get_by(%{id: id}) do
    case Repo.get_by(User, id: id) do
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
        where: l.user_id == u.id and l.target_user_id == ^user_id and l.status == 0
      )
    )
  end

  @spec edit(User.t(), %{skill_ids: [String.t()]}) ::
          {:ok, any} | {:error, Ecto.Multi.name(), any()}
  def edit(%User{} = user, %{skill_ids: skill_ids} = user_input) do
    Multi.new()
    |> Multi.update(:user, User.edit_changeset(user, user_input))
    |> Db.Skills.Skills.bulk_upsert_user_skills(user.id, 0, skill_ids)
    |> Repo.transaction()
  end

  # @spec edit(User.t(), map()) :: {:ok, User.t()} | {:error, Ecto.Changeset.t()}
  def edit(%User{} = user, user_input) do
    user
    |> User.edit_changeset(user_input)
    |> Repo.update()
  end

  @spec search(map) :: {:ok, [User.t()]} | {:ok, []}
  def search(conditions), do: search(User, conditions)

  # def search(condition) when is_bitstring(condtion), do: search(User, [condition])

  @spec search(query :: Ecto.Queryable.t(), map) :: {:ok, [User.t()]} | {:ok, []}
  def search(query, conditions) do
    users = Repo.all(build_queries(query, conditions))
    {:ok, users}
  end

  @spec get_favorites(integer) :: {:ok, [User.t()]} | {:ok, []}
  def get_favorites(user_id) do
    {:ok, Repo.all(Favorite, user_id: user_id)}
  end

  @spec preload(Ecto.Queryable.t(), association) :: [Ecto.Schema.t()] when association: String.t()
  def preload(query, association) when is_binary(association) do
    Repo.preload(query, [String.to_atom(association)])
  end

  @spec preload(Ecto.Queryable.t(), association) :: [Ecto.Schema.t()] when association: atom
  def preload(query, association) when is_atom(association) do
    Repo.preload(query, [association])
  end

  @spec preload(Ecto.Queryable.t(), associations) :: [Ecto.Schema.t()]
        when associations: list(atom)
  def preload(query, associations) when is_list(associations) do
    Repo.preload(query, associations)
  end

  @spec main_photo(User.t()) :: Photo.t() | nil
  def main_photo(user) do
    Repo.one(from(p in Photo, where: p.user_id == ^user.id and p.rank == 0))
  end

  @active_duration_days 3
  @limit_num 15
  @spec build_queries(Ecto.Queryable.t(), map) :: Ecto.Queyable.t()
  defp build_queries(query, conditions) do
    # TODO:
    # 1. add distance search with postgis
    # 2. ass pagination
    # 3. make reccomendation sophisticated
    Enum.reduce(conditions, query, fn
      {:genre_id, genre_id}, queries ->
        from(u in queries, where: u.genre_id == ^genre_id)

      {:occupation_type_id, occupation_type_id}, queries ->
        from(u in queries, where: u.occupation_type_id == ^occupation_type_id)

      {:is_active, true}, queries ->
        from(
          u in queries,
          where: u.last_activated_at > datetime_add(^Ecto.DateTime.utc(), -3, "day")
        )

      {:skill_ids, skill_ids}, queries ->
        from(
          u in queries,
          join: us in UserSkill,
          where: us.user_id == u.id and us.skill_id in ^skill_ids
        )

      {:distance, %{meter: meter, current_location: geom}}, queries ->
        from(u in queries, where: st_dwithin_in_meters(u.geom, ^geom, ^meter))

      _, queries ->
        queries
    end)
    |> limit(@limit_num)
  end
end
