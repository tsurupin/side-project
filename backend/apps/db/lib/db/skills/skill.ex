defmodule Db.Country do
  use Ecto.Schema
  import Ecto.Changeset

  schema "genres" do
    field :name, :string, null: false, unuque: true
    timestamps()

  end
end
