defmodule Db.Chats.Chats do
  @moduledoc """
  The chat context.
  """

  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]
  alias Ecto.Multi
  alias Db.Chats.{Chat, Message, Member, Group}
  alias Db.Users.UserLike
  alias Db.Repo

  @spec get_by(%{id: integer | String.t()}) :: {:ok, :chat} | {:error, :not_found}
  def get_by(%{id: id}) do
    case Repo.get_by(Chat, id: id) do
      %Chat{} = chat -> {:ok, chat}
      _ -> {:error, :not_found}
    end
  end

  @spec with_messages(Chat.t()) :: [Ecto.Schema.t()]
  def with_messages(chat) do
    Repo.preload(
      chat,
      messages: from(m in Message, order_by: m.inserted_at, preload: :user)
    )
  end

  @spec attended_chats(integer) :: [Chat.t()] | []
  def attended_chats(user_id) do
    from(
      c in Chat,
      join: m in Member,
      where: m.chat_id == c.id and m.user_id == ^user_id,
      order_by: [desc: c.is_main]
    )
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

  @spec create_chat_group(%{like: UserLike.t()}) ::
          {:ok, any()} | {:error, Ecto.Multi.name(), any()}
  def create_chat_group(%{like: like}) do
    create_chat_group_from_source(%{
      source_id: like.id,
      source_type: "UserLike",
      chat_name: "Private",
      member_ids: [like.user_id, like.target_user_id]
    })
  end

  @spec create_chat_group(%{project: Project.t()}) ::
          {:ok, any()} | {:error, Ecto.Multi.name(), any()}
  def create_chat_group(%{project: project}) do
    create_chat_group_from_source(%{
      source_id: project.id,
      source_type: "Project",
      chat_name: project.title,
      member_ids: [project.owner_id]
    })
  end

  @spec add_member(%{chat_id: integer, user_id: integer}) ::
          {:ok, Ecto.Schema.t()} | {:error, Ecto.Changeset.t()}
  def add_member(%{chat_id: chat_id, user_id: user_id}) do
    case Repo.one(
           from(m in Member,
             where: m.chat_id == ^chat_id and m.user_id == ^user_id and not is_nil(m.deleted_at)
           )
         ) do
      %Member{} = member ->
        Member.update_changeset(member, %{deleted_at: nil})

      nil ->
        Member.changeset(%{chat_id: chat_id, user_id: user_id})
    end
    |> Repo.insert_or_update()
  end

  @doc """
  create a message with input.
  input params
    - chat_id
    - message_type
    - user_id
    - comment(optional)
    - image(optional)
  """
  @spec create_message(map) :: {:ok, String.t()} | {:error, String.t()}
  def create_message(attrs) do
    case Repo.insert(Message.changeset(attrs)) do
      {:ok, %Message{} = message} -> {:ok, message}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec remove_member_from_chats(%{:project_id => integer, :user_id => integer}) ::
          {:ok, any()} | {:error, String.t()}
  def remove_member_from_chats(%{project_id: _project_id, user_id: _user_id} = attrs) do
    transaction =
      Multi.new()
      |> remove_member_from_chat(attended_members_in_project(attrs))
      |> Repo.transaction()

    case transaction do
      {:ok, result} -> {:ok, result}
      {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec create_chat_group_from_source(%{
          source_id: integer,
          source_type: String.t(),
          chat_name: String.t(),
          member_ids: [integer]
        }) :: {:ok, any()} | {:error, Ecto.Multi.name(), any()}
  defp create_chat_group_from_source(%{
         source_id: source_id,
         source_type: source_type,
         chat_name: chat_name,
         member_ids: member_ids
       }) do
    Multi.new()
    |> Multi.insert(
      :chat_group,
      Group.changeset(%{source_id: source_id, source_type: source_type})
    )
    |> Multi.run(:chat, fn _repo, %{chat_group: chat_group} ->
      Chat.changeset(%{chat_group_id: chat_group.id, is_main: true, name: chat_name})
      |> Repo.insert()
    end)
    |> Multi.run(:chat_member, fn _repo, %{chat: chat} ->
      add_members(Multi.new(), chat.id, member_ids)
    end)
    |> Repo.transaction()
  end

  @spec attended_members_in_project(%{
          :project_id => integer,
          :user_id => integer
        }) :: [Member.t()] | no_return()
  defp attended_members_in_project(%{project_id: project_id, user_id: user_id}) do
    from(
      m in Member,
      join: c in Chat,
      join: g in Group,
      where:
        m.chat_id == c.id and m.user_id == ^user_id and c.chat_group_id == g.id and
          g.source_id == ^project_id and g.source_type == "Project"
    )
    |> Repo.all()
  end

  @spec add_members(multi :: Ecto.Multi.t(), integer, []) ::
          {:ok, any()} | {:error, Ecto.Multi.name(), any()}
  defp add_members(multi, _chat_id, []) do
    multi
    |> Repo.transaction()
  end

  @spec add_members(multi :: Ecto.Multi.t(), integer, nonempty_list(integer)) ::
          {:ok, any()} | {:error, Ecto.Multi.name(), any()}
  defp add_members(multi, chat_id, [user_id | remaining]) do
    multi
    |> Multi.insert(
      "chat_member:#{user_id}",
      Member.changeset(%{chat_id: chat_id, user_id: user_id})
    )
    |> add_members(chat_id, remaining)
  end

  @spec remove_member_from_chat(Ecto.Multi.t(), []) :: Ecto.Multi.t()
  defp remove_member_from_chat(multi, []), do: multi

  @spec remove_member_from_chat(Ecto.Multi.t(), nonempty_list(Member.t())) :: Ecto.Multi.t()
  defp remove_member_from_chat(multi, [%Member{} = member | remainings]) do
    Multi.update(
      multi,
      "remove_member:#{member.id}",
      Member.delete_changeset(member, %{deleted_at: NaiveDateTime.utc_now()})
    )
    |> remove_member_from_chat(remainings)
  end
end
