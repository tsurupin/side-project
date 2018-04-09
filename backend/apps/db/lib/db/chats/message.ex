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
    |> validate_chat_member
    |> check_constraint(:image_url, name: "valid_chat_message")
    |> check_constraint(:comment, name: "valid_chat_message")
  end

  @spec validate_chat_member(Ecto.Changeset.t) :: Ecto.Changeset.t
  defp validate_chat_member(changeset) do
    user_id = get_field(changeset, :user_id)
    chat_id = get_field(changeset, :chat_id)
    case Db.Repo.get_by(Db.Chats.Member, chat_id: chat_id, user_id: user_id) do
      nil -> add_error(changeset, :user_id, "user should be member of the chat")
      _ -> changeset
    end
  end
end
