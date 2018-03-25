defmodule Db.Users.Users do
  @moduledoc """
  The Accoutns context.
  """

  import Ecto.Query, warn: false
  import Ecto.Query, only: [from: 1, from: 2, first: 1]

  alias Db.Repo
  alias Db.Users.User
  alias Db.Skills.UserSkill
  alias Db.Genres.Genre
  alias Db.OccupationTypes.OccupationType
  alias Db.Users.Photo

  @spec get_by(integer) :: map()
  def get_by(%{id: id}) do
    case Repo.get_by(User, id: id) do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end

  @spec search(map) :: map
  def search(conditions), do: search(User, conditions)

  #def search(condition) when is_bitstring(condtion), do: search(User, [condition])

  @active_duration_days 3
  @spec search(Ecto.Query, map):: map()
  def search(query, conditions) do
    # TODO: make reccomendation sophisticated
    users =
      conditions
      |> Enum.reduce(query, fn
        {:genre_id, genre_id}, queries ->
          from u in queries,
          join: c in Genre,
          where: c.id == ^genre_id
        {:occupation_type_id, occupation_type_id}, queries ->
          from u in queries,
          join: o in OccupationType,
          where: o.id == ^occupation_type_id
        {:is_active, is_active}, queries ->
          from u in queries,
          where: u.last_activated_at > datetime_add(^Ecto.DateTime.utc, -3, "day")
        {:skill_ids, skill_ids}, queries ->
          from u in queries,
          join: us in UserSkill,
          where: us.skill_id in(^skill_ids)
        # {:distance, distance} ->
        #   # TODO: use postgis
      end)
      |> Repo.all

    {:ok, users}
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

  @spec main_photo(User.t()) :: Photo.t()
  def main_photo(user) do
    Repo.one(
      from p in Photo,
      where: p.user_id == ^user.id and p.is_main == true
    )
  end

end
