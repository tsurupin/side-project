defmodule Db.Genre do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Projects.Project

  schema "genres" do
    field :name, :string, null: false
    timestamps()

    has_many :users, User
    has_many :projects, Project
  end
end
