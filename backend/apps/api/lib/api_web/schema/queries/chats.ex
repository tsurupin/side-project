defmodule ApiWeb.Schema.Queries.Chats do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers
  alias ApiWeb.Schema.Middleware

  object :chats_queries do
    @desc "Fetch chat messages"
    field :chat, :chat do
      arg :id, :id
      middleware Middleware.Authorize
      resolve &Resolvers.Chats.fetch_chat_with_messages/3
    end
  end

end
