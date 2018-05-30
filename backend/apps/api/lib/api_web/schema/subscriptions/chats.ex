defmodule ApiWeb.Schema.Subscriptions.Chats do
  use Absinthe.Schema.Notation
  alias Db.Chats.Message

  object :chats_subscriptions do
    @desc "scubscribe new message"
    field :new_message, :message do
      arg(:chat_id, non_null(:id))

      config(fn args, _info ->
        {:ok, topic: "chat:#{args.chat_id}"}
      end)

      trigger(
        :create_message,
        topic: fn
          %Message{} = message ->
            IO.inspect("message: #{message.id}, #{message.chat_id}")
            ["chat:#{message.chat_id}"]
          _ ->
            IO.inspect("no name")
            []
        end
      )

      # resolve fn root, _, _ ->
      #
      #   {:ok, root}
      # end
    end
  end
end
