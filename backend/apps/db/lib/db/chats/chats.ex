defmodule Db.Chats.Chats do
  @moduledoc """
  The chat context.
  """

  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]
  alias Ecto.Multi
  alias Db.Chats.{Chat, Message, Member, Group}
  alias Db.Users.UserLike
  alias Db.Repo

  @spec get_by(%{id: integer}) :: {:ok, :chat} | {:error, :not_found}
  def get_by(%{id: id}) do
    case Repo.get_by(Chat, id: id) do
      %Chat{} = chat -> {:ok, chat}
      _ -> {:error, :not_found}
    end
  end

  @spec create_chat_group(map) ::
          {:ok, any()} | {:error, Ecto.Multi.name(), any()}
  def create_chat_group(%{like: like}) do
    Multi.new()
    |> Multi.insert(:chat_group, Group.changeset(%{source_id: like.id, source_type: "UserLike"}))
    |> Multi.run(:chat, fn %{chat_group: chat_group} ->
      Chat.changeset(%{chat_group_id: chat_group.id, is_main: true, name: "Private"})
      |> Repo.insert()
    end)
    |> Multi.run(:chat_member, fn %{chat: chat} ->
      bulk_create_members(Multi.new(), chat.id, [like.user_id, like.target_user_id])
    end)
    |> Repo.transaction()
  end

  def create_chat_group(%{project: project}) do
    Multi.new()
    |> Multi.insert(
      :chat_group,
      Group.changeset(%{source_id: project.id, source_type: "Project"})
    )
    |> Multi.run(:chat, fn %{chat_group: chat_group} ->
      Chat.changeset(%{chat_group_id: chat_group.id, is_main: true, name: project.name})
      |> Repo.insert()
    end)
    |> Multi.run(:chat_member, fn %{chat: chat} ->
      bulk_create_members(Multi.new(), chat.id, [project.owner_id])
    end)
    |> Repo.transaction()
  end

  @spec bulk_create_members(multi :: Ecto.Multi.t(), integer, []) ::
          {:ok, any()} | {:error, Ecto.Multi.name(), any()}
  def bulk_create_members(multi, _chat_id, []) do
    multi
    |> Repo.transaction()
  end

  @spec bulk_create_members(multi :: Ecto.Multi.t(), integer, nonempty_list(integer)) ::
          {:ok, any()} | {:error, Ecto.Multi.name(), any()}
  def bulk_create_members(multi, chat_id, [user_id | remaining]) do
    multi
    |> Multi.insert(
      "chat_member:#{user_id}",
      Member.changeset(%{chat_id: chat_id, user_id: user_id})
    )
    |> bulk_create_members(chat_id, remaining)
  end

  @spec add_member(%{chat_id: integer, user_id: integer}) ::
          {:ok, Ecto.Schema.t()} | {:error, Ecto.Changeset.t()}
  def add_member(%{chat_id: chat_id, user_id: user_id}) do
    case Repo.get_by(Member, chat_id: chat_id, user_id: user_id) do
      %Member{} = member ->
        Member.update_changeset(member, %{deleted_at: nil})

      nil ->
        Member.changeset(%{chat_id: chat_id, user_id: user_id})
    end
    |> Repo.insert_or_update()
  end

  @spec remove_member_from_chats(%{:project_id => integer, :user_id => integer}) ::
          {:ok, any()} | {:error, String.t}
  def remove_member_from_chats(%{project_id: _project_id, user_id: _user_id} = attrs) do
    transaction =
      Multi.new()
      |> remove_member_from_chat(attended_members_in_project(attrs))
      |> Repo.transaction()
    case transaction do
      {:ok, _any} -> {:ok, _any}
      {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec create_message(map) :: {:ok, String.t()} | {:error, String.t()}
  def create_message(attrs) do
    case Repo.insert(Message.changeset(attrs)) do
      {:ok, message} -> {:ok, message}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec with_messages(Chat.t()) :: [Ecto.Schema.t()]
  def with_messages(chat) do
    Repo.preload(
      chat,
      messages: from(m in Message, order_by: m.inserted_at)
    )
  end

  @spec attended_chats(integer) :: [Chat.t()] | []
  def attended_chats(user_id) do
    attended_chats_query(user_id)
    |> Repo.all()
  end

  @spec main_chat(%{source_id: integer, source_type: String.t()}) :: Chat.t() | nil
  def main_chat(%{source_id: source_id, source_type: source_type}) do
    from(
      c in Chat,
      join: g in Group,
      where:
        c.chat_group_id == g.id and c.is_main == true and g.source_id == ^source_id and
          g.source_type == ^source_type
    )
    |> Repo.one()
  end

  @spec preload(Ecto.Queryable.t, list(atom)) :: [Ecto.Schema.t()]
  def preload(query, associations) do
    Repo.preload(query, associations)
  end

  @spec attended_members_in_project(%{
          :project_id => integer,
          :user_id => integer,
          optional(atom) => any
        }) :: [Member.t()] | no_return()
  defp attended_members_in_project(%{project_id: project_id, user_id: user_id}) do
    from(
      m in Member,
      join: c in Chat,
      join: g in Group,
      where:
        m.chat_id == c.id and m.user_id == ^user_id and c.group_id == g.id and
          g.source_id == ^project_id and g.source_type == "Porject"
    )
    |> Repo.all()
  end

  @spec attended_chats_query(integer) :: Ecto.Queryable.t()
  defp attended_chats_query(user_id) do
    from(
      c in Chat,
      join: m in Member,
      where: m.chat_id == c.id and m.user_id == ^user_id
    )
  end

  @spec remove_member_from_chat(Ecto.Multi.t(), []) :: Ecto.Multi.t()
  defp remove_member_from_chat(multi, []), do: multi

  @spec remove_member_from_chat(Ecto.Multi.t(), nonempty_list(Member.t())) :: Ecto.Multi.t()
  defp remove_member_from_chat(multi, [%Member{} = member | remainings]) do
    Multi.update(
      multi,
      "remove_member:#{member.id}",
      Member.delete_changeset(member, %{deleted_at: Timex.now()})
    )
    |> remove_member_from_chat(remainings)
  end
end
