defmodule Db.Users.Like do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  alias Db.Users.{User}

  alias __MODULE__

  @type t :: %Like{}

  schema "user_likes" do
    belongs_to(:user, User)
    belongs_to(:target_user, User)
    field(:deleted_at, :utc_datetime)
    field(:status, UserLikeStatusEnum, default: 0)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(user_id target_user_id status)a
    required_attrs = ~w(user_id target_user_id)a

    %Like{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> assoc_constraint(:user)
    |> assoc_constraint(:target_user)
    |> unique_constraint(:user_id, name: "user_likes_unique_index")
  end
end
