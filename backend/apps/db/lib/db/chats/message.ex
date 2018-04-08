defmodule Db.Chats.Message do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias Db.Chats.{Chat}
  alias Db.Users.User
  alias Db.Uploaders.ChatImageUploader
  alias __MODULE__

  @type t :: %Message{}

  schema "chat_messages" do
    field(:comment, :string)
    field(:image_url, ChatImageUploader.Type)
    field(:deleted_at, :utc_datetime)
    belongs_to(:chat, Chat)
    belongs_to(:user, User)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(user_id chat_id comment)a
    required_attrs = ~w(chat_id user_id)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> cast_attachments(attrs, [:image_url])
    |> assoc_constraint(:chat)
    |> assoc_constraint(:user)
    |> check_constraint(:image_url, name: "valid_chat_message")
    |> check_constraint(:comment, name: "valid_chat_message")
  end
end
