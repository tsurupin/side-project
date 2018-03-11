defmodule Db.OccupationTypes.OccupationType do
  @@moduledoc """

  """
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias __MODULE__

  @type t :: %OccupationType{}

  schema "occupation_types" do
    field :name, :string, null: false
    timestamps()

    has_many :users, User
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name)a
    required_attrs = ~w(name)a

    %OccupationType{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> unique_constraint(:name, name: "occupation_types_name_index")
  end
end
