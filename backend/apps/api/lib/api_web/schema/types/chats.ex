defmodule ApiWeb.Schema.Types.Chats do
  use Absinthe.Schema.Notation

  alias Db.Chats.Content
  alias Db.Uploaders.ChatImageUploader

  object :chat do
    field :id, :id
    field :name, :string
  end

  object :chat_contents do
    field :chat, :chat
    filed :chat_contents, list_of(:chat_content)
  end


  interface :source do
    resolve_type fn
      %{source_type: "User"}, _ -> :user
      %{source_type: "Project"}, _ -> :project
      _, _ -> nil
    end
  end


  object :chat_content do
    field :id, :id
    field :message, :message
    # field :image_url, :string do
    #   arg :format, :string, default_value: "thumb"
    #   resolve fn (%{Content{image_url: image_url} = content, %{format: format},_) ->
    #     {:ok, ChatImageUploader.url({image_url, content}, String.to_atom(format))}
    #   end
    # end
    interface :source
  end
end
