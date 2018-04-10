defmodule Db.Users.UserLike do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  alias Db.Users.{User}

  alias __MODULE__

  @type t :: %UserLike{}

  schema "user_likes" do
    belongs_to(:user, User)
    belongs_to(:target_user, User)
    field(:deleted_at, :utc_datetime)
    field(:status, UserLikeStatusEnum, default: :requested)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(user_id target_user_id status)a
    required_attrs = ~w(user_id target_user_id)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> assoc_constraint(:user)
    |> assoc_constraint(:target_user)
    |> unique_constraint(:user_id, name: "user_likes_unique_index")
  end

  @spec change_status_changeset(UserLike.t(), map) :: Ecto.Changeset.t()
  def change_status_changeset(%__MODULE__{} = like, attrs) do
    permitted_attrs = ~w(status)a
    required_attrs = ~w(status)a

    like
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:user_id, name: "user_likes_unique_index")
  end
end
