defmodule Db.Skills do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills" do
    field :name, :string, null: false
    timestamps()

  end
end
