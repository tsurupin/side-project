defmodule ApiWeb.Schema.Mutations.Chats do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  object :chats_mutations do
    @desc "create a new message"
    field :create_message, :message do
      arg(:message_input, non_null(:message_input))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Chats.create_message/3)
    end
  end
end
