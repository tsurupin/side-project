defmodule ApiWeb.Schema.Resolvers.Chats do
  alias Db.Chats.Chats

  def fetch_chat_with_contents(_, %{id: id}, _) do
    case Chats.get_by(%{id: id}) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}
      {:ok, chat} ->
        chat = Chats.with_contents(chat)
        {:ok, chat}
    end
  end

end
