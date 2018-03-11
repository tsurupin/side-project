defmodule Db.Chats.Member do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  alias Db.Chats.Chat
  alias Db.Users.User

  alias __MODULE__
  @type t :: %Member{}

  schema "chat_members" do
    belongs_to(:chat, Chat)
    belongs_to(:user_id, User)
    field(:deleted_at, :utc_datetime)

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(chat_id user_id)a
    required_attrs = ~w(chat_id user_id)a

    %Member{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> assoc_constraint(:chat)
    |> assoc_constraint(:user)
    |> unique_constraint(:chat_id, name: "chat_members_chat_id_and_user_id_index")
  end
end
