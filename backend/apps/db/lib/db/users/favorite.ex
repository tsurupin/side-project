defmodule Db.Users.Favorite do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User

  alias __MODULE__

  @type t :: %Favorite{}

  schema "user_favorites" do
    field :target_id, :integer, null: false
    field :target_type, :string, null: false
    field :deleted_at, :datetime
    belongs_to(:user_id, User)

    timestamps()
  end

  @spec changeset(map()) :: Ecto.Changeset.t()

  def changeset(attrs) do
    permitted_attrs = ~w(target_id target_type user_id)
    required_attrs = ~w(target_id target_type user_id)

    %Favorite{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> unique_constraint(:user_id, name: "user_favorites_unique_index")
  end
end
