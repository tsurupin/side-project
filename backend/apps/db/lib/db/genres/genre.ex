defmodule Db.Genres.Genre do
  @moduledoc """

  """
  use Ecto.Schema
  use Db.Helpers.SoftDeletion
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Projects.Project
  alias __MODULE__

  @type t :: %Genre{}

  schema "genres" do
    field(:name, :string, null: false)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)

    has_many(:users, User)
    has_many(:projects, Project)
  end

end
