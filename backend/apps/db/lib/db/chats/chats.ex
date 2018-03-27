defmodule Db.Chats.Chats do
  @moduledoc """
  The chat context.
  """

  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]

  alias Db.Chats.{Chat, Content, Member}
  alias Db.Repo

  @spec get_by(map) :: no_return
  def get_by(%{id: id}) do
    case Repo.get_by(Chat, id: id) do
      nil -> {:error, :not_found}
      chat -> {:ok, chat}
    end
  end

  @spec with_contents(Chat.t) :: [Ecto.Schema.t]
  def with_contents(chat) do
    Repo.preload(
      chat,
      contents: from(c in Content, order_by: c.inserted_at)
    )
  end

  @spec attended_chats(integer) :: [Chat.t]
  def attended_chats(user_id) do
    Repo.all(
      from c in Chat,
      join: m in Member,
      where: m.chat_id == c.id and m.user_id == ^user_id
    )
  end

end
