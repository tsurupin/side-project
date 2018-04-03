defmodule Db.Chats.Chats do
  @moduledoc """
  The chat context.
  """

  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]
  alias Ecto.Multi
  alias Db.Chats.{Chat, Content, Member, Group}
  alias Db.Repo


  @spec get_by(map) :: no_return
  def get_by(%{id: id}) do
    case Repo.get_by(Chat, id: id) do
      nil -> {:error, :not_found}
      chat -> {:ok, chat}
    end
  end

  #@spec create_chat_group(integer) :: {:ok, any()} || {:error, Ecto.Multi.name(), any()}
  def create_chat_group(%{like: like}) do
    Multi.new
    |> Multi.insert(:chat_group, Group.changeset(%{source_id: like.id, source_type: "Like"}))
    |> Multi.run(:chat, fn %{chat_group: chat_group} ->
      Chat.changeset(%{chat_group_id: chat_group.id, is_main: true, name: "Private"})
      |> Repo.insert
    end)
    |> Multi.run(:chat_member, fn %{chat: chat} ->
      bulk_create_members(Multi.new, chat.id, [like.user_id, like.target_user_id])
    end)
    |> Repo.transaction
  end

  #@spec bulk_create_members(Ecto.Multi.t, integer, is_list(integer)) :: {:ok, any()} || {:error, Ecto.Multi.name(), any()}
  def bulk_create_members(multi, _chat_id, []) do
     multi
     |> Repo.transaction
  end

  def bulk_create_members(multi, chat_id, [user_id | remaining] ) do
     multi
     |> Multi.insert("chat_member:#{user_id}", Member.changeset(%{chat_id: chat_id, user_id: user_id}))
     |> bulk_create_members(chat_id, remaining)
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
