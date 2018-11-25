defmodule Db.Locations.Cities do
  @moduledoc """
  City related context
  """
  import Ecto.Changeset
  import Ecto.Query, only: [from: 1, from: 2, first: 1]
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Locations.{City, ZipCode, Country, Countries}
  alias __MODULE__

  @spec search(%{name: String.t()}) :: [City.t()]
  def search(%{name: name}) do
    query =
      from(
        c in City,
        where: ilike(c.name, ^"#{name}%")
      )

    Repo.all(query)
  end

  # TODO: zip_code can associate to multiple cities
  # @spec search(%{zip_code: String.t()}) :: [City.t()]
  # def search(%{zip_code: zip_code}) do
  #   query =
  #     from(
  #       c in City,
  #       join: z in ZipCode,
  #       where: z.city_id == c.id and z.zip_code == ^zip_code
  #     )

  #   Repo.all(query)
  # end

  @spec get_by(%{
          name: Stiring.t(),
          state_name: String.t(),
          state_abbreviation: String.t(),
          country_name: String.t()
        }) :: {:ok, City.t()} | {:error, :not_found} | {:error, :country_not_found}
  def get_by(%{name: name, state_name: state_name, country_name: country_name}) do
    case Countries.get_by(%{name: country_name}) do
      {:ok, country} ->
        case Repo.get_by(City, name: name, state_name: state_name, country_id: country.id) do
          %City{} = city -> {:ok, city}
          _ -> {:error, country, :not_found}
        end

      {:error, :not_found} ->
        {:error, :country_not_found}
    end
  end

  @spec create(%{
          name: Stiring.t(),
          state_name: String.t(),
          state_abbreviation: String.t(),
          country_id: integer
        }) :: {:ok, City.t()} | {:error, String.t()}
  def create(
        %{
          name: name,
          state_name: state_name,
          state_abbreviation: state_abbreviation,
          country_id: country_id
        } = attrs
      ) do
    City.changeset(attrs)
    |> Repo.insert()
  end
end
