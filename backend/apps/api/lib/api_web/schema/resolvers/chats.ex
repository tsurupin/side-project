defmodule ApiWeb.Schema.Resolvers.Chats do
  alias Db.Chats.Chats

  def fetch_chat_with_messages(_, %{id: id}, _) do
    case Chats.get_by(%{id: id}) do
      {:error, :not_found} ->
        IO.inspect("NOT FOUND")
        {:error, "Not Found"}

      {:ok, chat} ->
        chat = Chats.with_messages(chat)
        {:ok, chat}
    end
  end

  def create_message(_, %{message_input: message_input}, %{context: %{current_user: current_user}}) do
    case Chats.create_message(Map.put_new(message_input, :user_id, current_user.id)) do
      {:ok, message} ->
        {:ok, Chats.preload(message, [:user])}

      {:error, error_message} ->
        {:error, error_message}
    end
  end
end
