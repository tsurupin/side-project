defmodule Db.Users.UserLike do
  use Ecto.Schema
  use Db.Helpers.SoftDeletion
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

end
