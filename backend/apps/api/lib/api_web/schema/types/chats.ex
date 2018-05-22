defmodule ApiWeb.Schema.Types.Chats do
  use Absinthe.Schema.Notation

  alias Db.Chats.Message
  alias Db.Uploaders.ChatImageUploader

  object :chat do
    field(:id, :id)
    field(:name, :string)
    field(:messages, list_of(:message))
  end

  object :message do
    field(:id, :id)
    field(:chat_id, :integer)
    field(:user, :user)
    field(:comment, :string)

    field :image_url, :string do
      arg(:format, :string, default_value: "thumb")

      resolve(fn %Message{image_url: image_url} = message, %{format: format}, _ ->
        {:ok, ChatImageUploader.url({image_url, message}, String.to_atom(format))}
      end)
    end

    field(:inserted_at, :native_datetime)
  end

  input_object :message_input do
    field(:chat_id, :id)
    field(:comment, :string)
    field(:image, :upload)
  end
end
