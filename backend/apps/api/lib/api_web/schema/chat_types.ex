defmodule ApiWeb.Schema.ChatTypes do
  use Absinthe.Schema.Notation

  object :chat do
    field :id, :id
    field :name, :string
  end

  object :chat_contents do
    field :chat, :chat
    filed :chat_contents, list_of(:chat_content)
  end


  object :chat_content do
    field :id, :id,
    field :message, :message,
    field :primary_image_url, :image_url, resolve: fn(_args, %{source: chat_content}) ->
      {:ok, chat_content.image_url.primary}
    end

    field :user, :user
  end


end
