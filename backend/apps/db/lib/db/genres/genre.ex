defmodule Db.Genres.Genre do
  @moduledoc """

  """
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Projects.Project
  alias __MODULE__

  @type t :: %Genre{}

  schema "genres" do
    field(:name, :string, null: false)
    timestamps(type: :utc_datetime)

    has_many(:users, User)
    has_many(:projects, Project)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name)a
    required_attrs = ~w(name)a

    %Genre{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:name, name: "genres_name_index")
  end
end
