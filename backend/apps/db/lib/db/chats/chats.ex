defmodule Db.Chats.Chats do
  @moduledoc """
  The chat context.
  """

  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]

  alias Db.Chats.{Chat, Content}
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
end
