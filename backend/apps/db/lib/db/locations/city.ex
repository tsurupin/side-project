defmodule Db.Locations.City do
  @moduledoc """

  """
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Locations.Country
  alias __MODULE__

  @type t :: %City{}

  schema "cities" do
    field(:name, :string, null: false)
    field(:state_name, :string, null: false)
    field(:state_abbreviation, :string)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)

    belongs_to(:country, Country)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name state_name state_abbreviation country_id)a
    required_attrs = ~w(name)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:name, name: "cities_name_and_state_name_and_country_id_index")
  end
end
