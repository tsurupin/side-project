defmodule ApiWeb.Schema.Types.Chats do
  use Absinthe.Schema.Notation

  alias Db.Chats.Message
  alias Db.Chats.{Chat, Subject}
  alias Db.Users.Photo
  alias Db.Users.Users
  alias Db.Uploaders.ChatImageUploader
  alias Db.Uploaders.{UserPhotoUploader, ProjectPhotoUploader}

  object :chat do
    field(:id, :id)
    field(:subject, :subject)

    # field :subject_name, :string do
    #   resolve(fn %Chat{subject: subject}, _, _ ->
    #     {:ok, subject.name}
    #   end)
    # end

    # field :subject_id, :id do
    #   resolve(fn %Chat{subject: subject}, _, _ ->
    #     {:ok, subject.id}
    #   end)
    # end

    # field :subject_image_url, :string do
    #   resolve(fn %Chat{subject: subject}, _, _ ->
    #     case subject.source_type do
    #       "Project" ->
    #         case subject.photo do
    #           nil -> {:ok, ProjectPhotoUploader.missing_url(:thumb)}
    #           photo -> {:ok, ProjectPhotoUploader.url({photo.image_url, photo}, :thumb)}
    #         end
    #       "UserLike" ->
    #         case subject.photo do
    #           nil -> {:ok, UserPhotoUploader.missing_url(:thumb)}
    #           photo -> {:ok, UserPhotoUploader.url({photo.image_url, photo}, :thumb)}
    #         end
    #     end
    #   end)
    # end

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
  end

  object :subject do
    field :id, :id do
      resolve(fn %Subject{} = subject, _, _ ->
        {:ok, subject.id}
      end)
    end

    field :name, :string do
      resolve(fn %Subject{} = subject, _, _ ->
        {:ok, subject.name}
      end)
    end

    field :source_type, :string do
      resolve(fn %Subject{} = subject, _, _ ->
        {:ok, subject.source_type}
      end)
    end

    field :image_url, :string do
      resolve(fn %Subject{} = subject, _, _ ->
        case subject.source_type do
          "Project" ->
            case subject.photo do
              nil -> {:ok, ProjectPhotoUploader.missing_url(:thumb)}
              photo -> {:ok, ProjectPhotoUploader.url({photo.image_url, photo}, :thumb)}
            end

          "UserLike" ->
            case subject.photo do
              nil -> {:ok, UserPhotoUploader.missing_url(:thumb)}
              photo -> {:ok, UserPhotoUploader.url({photo.image_url, photo}, :thumb)}
            end
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
