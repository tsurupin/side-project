defmodule Db.Chats.Content do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias Db.Chats.{Chat}
  alias Db.ChatImageUploader
  alias __MODULE__

  @type t :: %Content{}

  schema "chat_contents" do
    field(:source_id, :integer, null: false)
    field(:source_type, :string, null: false)
    field(:message, :string)
    field(:image_url, ChatImageUploader.Type)
    field(:deleted_at, :utc_datetime)
    belongs_to(:chat_id, Chat)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(source_id source_type chat_id message image_url)a
    required_attrs = ~w(chat_id source_id source_type)a

    %Content{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> unique_constraint(:chat_id, name: "chat_contents_unique_index")
    |> check_constraint(:image_url, name: "valid_chat_content")
    |> check_constraint(:message, name: "valid_chat_content")
  end
end
