defmodule Db.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :uid, :string, null: false
    field :provider_id, :string, null: false
    field :display_name, :string
    field :email, :string
    field :photo_url, :string
    timestamps()
  end

  @attributes [:uid, :provider_id, :display_name, :email, :photo_url]
  @required_attributes [:uid, :provider_id]

  def changeset(user, attrs) do
    user
    |> cast(attrs, @attributes)
    |> validate_required(@required_attributes)
  end
end
