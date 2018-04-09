defmodule ApiWeb.Schema.Subscriptions.Chats do
  use Absinthe.Schema.Notation
  alias Db.Chats.Message

  object :chats_subscriptions do
    @desc "scubscribe new message"
    field :new_message, :message do
      arg :chat_id, non_null(:integer)

      config fn args, _info ->
        {:ok, topic: "new_message:#{args.chat_id}"}
      end

      trigger :create_message, topic: fn

        %Message{} = message ->
          ["new_message:#{message.chat_id}"]
        _ -> []
      end

    end
  end

end
