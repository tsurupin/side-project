defmodule Db.Users.Favorite do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Projects.Project

  alias __MODULE__

  @type t :: %Favorite{}

  schema "user_favorites" do
    belongs_to(:user, User)
    belongs_to(:target_user, User)
    belongs_to(:target_project, Project)

    field(:deleted_at, :utc_datetime)

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(target_user_id target_project_id user_id)a
    required_attrs = ~w(user_id)a

    %Favorite{}
    |> cast(attrs, permitted_attrs)
    |> assoc_constraint(:user)
    |> validate_required(required_attrs)
    |> unique_constraint(:user_id, name: "user_favorites_unique_index")
  end
end
