defmodule Db.Locations.Country do
  @moduledoc """

  """
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Locations.City
  alias __MODULE__

  @type t :: %Country{}

  schema "countries" do
    field(:name, :string, null: false)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)

    has_many(:cities, City)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name)a
    required_attrs = ~w(name)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:name, name: "countries_name_index")
  end
end
