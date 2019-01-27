defmodule Db.Chats.AliveMember do
  @moduledoc """
  Members who belongs to a chat
  """

  use Ecto.Schema
  import Ecto.{Changeset, Query}
  alias Db.Chats.Chat
  alias Db.Users.User

  alias __MODULE__
  @type t :: %__MODULE__{}

  schema "alive_chat_members" do
    belongs_to(:chat, Chat)
    belongs_to(:user, User)
    field(:deleted_at, :utc_datetime)

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(chat_id user_id)a
    required_attrs = ~w(chat_id user_id)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> assoc_constraint(:chat)
    |> assoc_constraint(:user)
    |> unique_constraint(:chat_id, name: "chat_members_chat_id_and_user_id_index")
  end



end
