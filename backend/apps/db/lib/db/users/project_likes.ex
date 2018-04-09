defmodule Db.Users.ProjectLikes do
  @moduledoc """
  The ProjectLike context.
  """

  use Timex
  import Ecto.Query, warn: false
  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]

  alias Ecto.Multi

  alias Db.Repo
  alias Db.Users.{User, Project, ProjectLike}
  alias Db.Chats.Chats
  alias Db.Projects

  def like(%{project_id: project_id, user_id: user_id} = attrs) do
    transaction =
      Multi.new()
      |> Multi.insert(:create_project_like, ProjectLike.changeset(attrs))
      |> Multi.run(:change_project_status, fn %{create_project_like: project_like} ->
        approve(project_like)
      end)
      |> Repo.transaction()

    IO.inspect(transaction)

    case transaction do
      {:ok, %{change_project_status: %{main_chat: chat}}} -> {:ok, chat}
      {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  def withdraw_like(%{project_id: project_id, user_id: user_id} = attrs) do
    case Repo.get_by(ProjectLike, attrs) do
      %ProjectLike{status: :requested} = like ->
        case Repo.delete(like) do
          {:ok, _like} -> {:ok, _like}
          {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
        end

      %ProjectLike{status: :approved} = like ->
        transaction =
          Multi.new()
          |> Multi.run(:delete_chat_member, fn _ ->
            Chats.remove_member_from_chats(%{project_id: project_id, user_id: user_id})
          end)
          |> Multi.update(
            :delete_project_member,
            Projects.Member.update_changeset(%{
              project_id: project_id,
              user_id: user_id,
              deleted_at: Timex.now()
            })
          )
          |> Multi.delete(:delete_project_like, like)
          |> Repo.transaction()

      _ ->
        {:error, :bad_request}
    end
  end

  defp approve(%ProjectLike{project_id: project_id, user_id: user_id} = project_like) do
    Multi.new()
    |> Multi.update(:approve, ProjectLike.approve_changeset(project_like, %{status: :approved}))
    |> Multi.insert_or_update(
      :add_member_to_project,
      Projects.Member.changeset(%{project_id: project_id, user_id: user_id})
    )
    |> Multi.run(:main_chat, fn _ ->
      case Chats.main_chat(%{source_id: project_id, source_type: "Project"}) do
        nil -> {:error, :not_found_main_chat}
        chat -> {:ok, chat}
      end
    end)
    |> Multi.run(:add_member_to_main_chat, fn %{main_chat: main_chat} ->
      Chats.add_member(%{chat_id: main_chat.id, user_id: user_id})
    end)
    |> Repo.transaction()
  end
end
