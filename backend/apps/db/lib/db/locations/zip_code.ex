defmodule Db.Locations.ZipCode do
  @moduledoc """

  """
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Locations.City
  alias __MODULE__

  @type t :: %ZipCode{}

  schema "zip_codes" do
    field(:zip_code, :string, null: false)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)

    belongs_to(:city, City)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(zip_code city_id)a
    required_attrs = ~w(zip_code)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> assoc_constraint(:city)
    |> unique_constraint(:name, name: "zip_codes_code_index")
  end
end
