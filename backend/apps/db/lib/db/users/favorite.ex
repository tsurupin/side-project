defmodule Db.Users.Favorite do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User

  alias __MODULE__

  @type t :: %Favorite{}

  schema "user_favorites" do
    field(:target_id, :integer, null: false)
    field(:target_type, :string, null: false)
    field(:deleted_at, :utc_datetime)
    belongs_to(:user, User)

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()

  def changeset(attrs) do
    permitted_attrs = ~w(target_id target_type user_id)a
    required_attrs = ~w(target_id target_type user_id)a

    %Favorite{}
    |> cast(attrs, permitted_attrs)
    |> assoc_constraint(:user)
    |> validate_required(required_attrs)
    |> unique_constraint(:user_id, name: "user_favorites_unique_index")
  end
end
