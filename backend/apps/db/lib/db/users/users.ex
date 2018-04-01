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
  alias Db.Users.{User, Photo, Favorite, Like}
  alias Db.Uploaders.UserPhotoUploader


  @spec get_by(map) :: map()
  def get_by(%{id: id}) do
    case Repo.get_by(User, id: id) do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end

  @spec liked(integer) :: [User.t]
  def liked(user_id) do
    Repo.all(
      from u in User,
      join: l in Like,
      where: l.user_id == u.id and l.target_user_id == ^user_id and l.status == 0
    )
  end

  #@spec edit(integer, map) :: [:ok, User.t] || [:error, ]
  def edit(%User{} = user, %{skill_ids: skill_ids} = user_input) do
    Multi.new
    |> Multi.update(:user, User.edit_changeset(user, user_input))
    |> Db.Skills.Skills.bulk_upsert_user_skills(user.id, 0, skill_ids)
    |> Repo.transaction
  end

  def edit(%User{} = user, user_input) do
    user
    |> User.edit_changeset(user_input)
    |> Repo.update
  end

  @spec search(map) :: map
  def search(conditions), do: search(User, conditions)

  #def search(condition) when is_bitstring(condtion), do: search(User, [condition])


  @spec search(Ecto.Query, map):: map()
  def search(query, conditions) do
    users = Repo.all(build_queries(query, conditions))
    {:ok, users}
  end

  @spec get_favorites(integer) :: map
  def get_favorites(user_id) do
    {:ok, Repo.all(Favorite, user_id: user_id)}
  end

  #@spec preload(Ecto.Query, any): Repo
  def preload(query, association) when is_binary(association) do
    Repo.preload(query, [String.to_atom(association)])
  end

  def preload(query, association) when is_atom(association) do
    Repo.preload(query, [association])
  end

  def preload(query, associations) when is_list(associations) do
     Repo.preload(query, associations)
  end

  @active_duration_days 3
  @limit_num 15
  @spec build_queries(Ecto.Query, map):: list(Ecto.Query)
  defp build_queries(query, conditions) do
    # TODO:
    # 1. add distance search with postgis
    # 2. ass pagination
    # 3. make reccomendation sophisticated
    Enum.reduce(conditions, query, fn
      {:genre_id, genre_id}, queries ->
        from u in queries,
        where: u.genre_id == ^genre_id
      {:occupation_type_id, occupation_type_id}, queries ->
        from u in queries,
        where: u.occupation_type_id == ^occupation_type_id
      {:is_active, is_active}, queries ->
        from u in queries,
        where: u.last_activated_at > datetime_add(^Ecto.DateTime.utc, -3, "day")
      {:skill_ids, skill_ids}, queries ->
        from u in queries,
        join: us in UserSkill,
        where: us.user_id == u.id and us.skill_id in(^skill_ids)
      {:distance, %{meter: meter, current_location: geom}}, queries ->
        from u in queries, where: st_dwithin_in_meters(u.geom, ^geom, ^meter)
      _, queries ->
        queries
    end)
    |> limit(@limit_num)
  end

end
