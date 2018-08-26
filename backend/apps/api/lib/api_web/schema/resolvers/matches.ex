defmodule ApiWeb.Schema.Resolvers.Matches do
  alias Db.Chats.Chats
  alias Db.Users.Users

  def fetch(_, _, %{context: %{current_user: current_user}}) do
    liked_users = Users.liked(current_user.id)
    chats = Chats.attended_chats(current_user.id) |> Chats.with_messages
    {:ok, %{liked_user_list: liked_users, chat_list: chats}}
  end
end
