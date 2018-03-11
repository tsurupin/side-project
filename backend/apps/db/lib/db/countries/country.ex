defmodule Db.Countries.Country do
  @(@moduledoc """

    """)
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Users.Project
  alias __MODULE__

  @type t :: %Country{}

  schema "coubntries" do
    field(:name, :string, null: false)
    timestamps()

    has_many(:users, User)
    has_many(:projects, Project)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name)a
    required_attrs = ~w(name)a

    %Country{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> unique_constraint(:name, name: "countries_name_index")
  end
end
