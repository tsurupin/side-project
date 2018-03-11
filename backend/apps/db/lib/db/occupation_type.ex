defmodule Db.OccupationType do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User

  schema "occupation_types" do
    field :name, :string, null: false
    timestamps()

    has_many :users, User
  end
end
