defmodule Db.Chats.Member do
  @moduledoc """
  Members who belongs to a chat
  """

  use Ecto.Schema
  use Db.Helpers.SoftDeletion
  import Ecto.{Changeset, Query}
  alias Db.Chats.Chat
  alias Db.Users.User

  alias __MODULE__
  @type t :: %Member{}

  schema "chat_members" do
    belongs_to(:chat, Chat)
    belongs_to(:user, User)
    field(:deleted_at, :utc_datetime)

    timestamps(type: :utc_datetime)
  end

  @spec update_changeset(Member.t(), map()) :: Ecto.Changeset.t()
  def update_changeset(member, attrs) do
    permitted_attrs = ~w(deleted_at)a
    required_attrs = ~w(deleted_at)a

    member
    |> cast(attrs, permitted_attrs)
    |> unique_constraint(:chat_id, name: "chat_members_chat_id_and_user_id_index")
  end

end
