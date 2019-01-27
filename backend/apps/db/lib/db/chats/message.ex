defmodule Db.Chats.Message do
  @moduledoc """
  Messages that are created in a chat.
  Message contains image/comment or image&comment
  """

  use Ecto.Schema
  use Arc.Ecto.Schema
  use Db.Helpers.SoftDeletion
  import Ecto.Changeset
  alias Db.Chats.{Chat}
  alias Db.Users.User
  alias Db.Uploaders.ChatImageUploader
  alias __MODULE__

  @type t :: %Message{}

  schema "chat_messages" do
    field(:comment, :string)
    field(:uuid, :string, null: false)
    field(:image_url, ChatImageUploader.Type)
    field(:message_type, ChatMessageTypeEnum, default: :comment)
    field(:deleted_at, :utc_datetime)
    belongs_to(:chat, Chat)
    belongs_to(:user, User)
    timestamps(type: :utc_datetime)
  end

end
