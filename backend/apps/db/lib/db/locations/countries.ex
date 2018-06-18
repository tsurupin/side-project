defmodule Db.Locations.Countries do
  import Ecto.Changeset
  import Ecto.Query, only: [from: 1, from: 2, first: 1]
  alias Db.Repo
  alias Db.Locations.{Country}
  alias __MODULE__

  @spec get_by(%{name: String.t()}) :: {:ok, Country.t()} | {:error, :not_found}
  def get_by(%{name: name}) do
    case Repo.get_by(Country, name: name) do
      %Country{} = country -> {:ok, country}
      _ -> {:error, :not_found}
    end
  end
end
