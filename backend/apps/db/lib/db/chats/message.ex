defmodule Db.Chats.Message do
  @moduledoc """
  Messages that are created in a chat.
  Message contains image/comment or image&comment
  """

  use Ecto.Schema
  use Arc.Ecto.Schema
  use Db.Helper.SoftDeletion
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

  @message_types ~w(comment upload)a
  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(user_id chat_id comment uuid message_type)a
    required_attrs = ~w(chat_id user_id message_type)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> set_uuid_if_nil
    |> cast_attachments(add_image_url(attrs), [:image_url])
    |> assoc_constraint(:chat)
    |> assoc_constraint(:user)
    |> validate_required(required_attrs)
    |> validate_inclusion(:message_type, @message_types)
    |> validate_content
    |> validate_chat_member
    |> check_constraint(:image_url, name: "valid_chat_message")
    |> check_constraint(:comment, name: "valid_chat_message")
  end

  @spec validate_chat_member(Ecto.Changeset.t()) :: Ecto.Changeset.t()
  defp validate_chat_member(changeset) do
    user_id = get_field(changeset, :user_id)
    chat_id = get_field(changeset, :chat_id)

    case Db.Repo.get_by(Db.Chats.Member, chat_id: chat_id, user_id: user_id) do
      nil -> add_error(changeset, :user_id, "user should be member of the chat")
      _ -> changeset
    end
  end

  @spec validate_content(Ecto.Changeset.t()) :: Ecto.Changeset.t()
  defp validate_content(changeset) do
    case {get_field(changeset, :message_type), get_field(changeset, :image_url),
          get_field(changeset, :comment)} do
      {:upload, nil, _} -> add_error(changeset, :image_url, "should be present")
      {:comment, _, nil} -> add_error(changeset, :comment, "should be present")
      _ -> changeset
    end
  end

  @spec set_uuid_if_nil(Ecto.Changeset.t()) :: Ecto.Changeset.t()
  defp set_uuid_if_nil(changeset) do
    if get_field(changeset, :uuid) == nil do
      force_change(changeset, :uuid, Ecto.UUID.generate())
    else
      changeset
    end
  end

  defp add_image_url(attrs) do
    case attrs[:image] do
      nil -> attrs
      image -> Map.merge(attrs, %{image_url: image})
    end
  end
end
