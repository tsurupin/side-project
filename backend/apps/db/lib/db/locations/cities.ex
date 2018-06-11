defmodule Db.Locations.Cities do
  import Ecto.Changeset
  import Ecto.Query, only: [from: 1, from: 2, first: 1]
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Locations.{City, ZipCode, Country}
  alias __MODULE__

  @spec search(%{name: String.t()}) :: [City.t()]
  def search(%{name: name}) do
    query =
      from(
        c in City,
        where: ilike(c.name, ^"%#{name}%")
      )

    Repo.all(query)
  end

  @spec search(%{zip_code: String.t()}) :: [City.t()]
  def search(%{zip_code: zip_code}) do
    query =
      from(
        c in City,
        join: z in ZipCode,
        where: z.city_id == c.id and z.zip_code == ^zip_code
      )

    Repo.all(query)
  end
end
