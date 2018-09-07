defmodule ApiWeb.Schema.Types.Chats do
  use Absinthe.Schema.Notation

  alias Db.Chats.Message
  alias Db.Chats.Chat
  alias Db.Users.Photo
  alias Db.Users.Users
  alias Db.Uploaders.ChatImageUploader
  alias Db.Uploaders.UserPhotoUploader

  object :chat do
    field(:id, :id)
    field(:name, :string)
    field(:messages, list_of(:message))

    field :last_comment, :string do
      resolve(fn %Chat{messages: messages}, _, _ ->
        case List.last(messages) do
          nil -> {:ok, nil}
          %Message{comment: comment} = _message -> {:ok, comment}
        end
      end)
    end

    field :last_commented_at, :string do
      resolve(fn %Chat{messages: messages}, _, _ ->
        case List.last(messages) do
          nil ->
            {:ok, nil}

          %Message{inserted_at: inserted_at} = _message ->
            {:ok,
             "#{inserted_at.month}/#{inserted_at.day} #{inserted_at.hour}:#{inserted_at.minute}"}
        end
      end)
    end

    field :image_url, :string do
      resolve(fn %Chat{messages: messages}, _, _ ->
        with %Message{user: user} <- List.last(messages),
             %Photo{image_url: image_url} = photo <- Users.main_photo(user) do
          {:ok, UserPhotoUploader.url({image_url, photo}, :thumb)}
        else
          _ -> {:ok, UserPhotoUploader.missing_url(:thumb)}
        end
      end)
    end
  end

  object :message do
    field(:id, :id)
    field(:chat_id, :id)
    field(:user, :user)
    field(:comment, :string)

    field :inserted_at, :string do
      resolve(fn %Message{inserted_at: inserted_at}, _, _ ->
        {:ok, "#{inserted_at.month}/#{inserted_at.day} #{inserted_at.hour}:#{inserted_at.minute}"}
      end)
    end

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
    field(:message_type, :string)
  end
end
