defmodule Db.Users.ProjectLikes do
  @moduledoc """
  ProjectLike context.
  """

  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2], warn: false

  alias Ecto.Multi

  alias Db.Repo
  alias Db.Users.{User, ProjectLike}
  alias Db.Chats.{Chats, Chat}
  alias Db.Projects

  @spec like(%{project_id: integer, user_id: integer}) :: {:ok, Chat.t()} | {:error, String.t()}
  def like(%{project_id: _project_id, user_id: _user_id} = attrs) do
    transaction =
      Multi.new()
      |> Multi.insert(:create_project_like, ProjectLike.changeset(attrs))
      |> Multi.merge(fn %{create_project_like: project_like} ->
        approve(project_like)
      end)
      |> Repo.transaction()

    case transaction do
      {:ok, %{main_chat: chat}} -> {:ok, chat}
      {:error, :main_chat, reason, _changeset} -> {:error, "main chat is not found"}
      {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec withdraw_like(%{project_id: integer, user_id: integer}) ::
          {:ok, any}
          | {:error, String.t()}
          | {:error, :bad_request}
  def withdraw_like(%{project_id: project_id, user_id: user_id} = attrs) do
    case Repo.one(
           from(pl in ProjectLike,
             where:
               pl.project_id == ^project_id and pl.user_id == ^user_id and is_nil(pl.deleted_at)
           )
         ) do
      %ProjectLike{status: :requested} = like ->
        case Repo.update(:delete_project_like, ProjectLike.delete_changeset(like)) do
          {:ok, _like} -> {:ok, _like}
          {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
        end

      %ProjectLike{status: :approved} = like ->
        transaction =
          Multi.new()
          |> Multi.run(:delete_chat_member, fn _repo, _ ->
            Chats.remove_member_from_chats(%{project_id: project_id, user_id: user_id})
          end)
          |> Multi.run(:delete_project_member, fn _repo, _ ->
            Projects.Projects.remove_member_from_project(%{
              project_id: project_id,
              user_id: user_id
            })
          end)
          |> Multi.update(:delete_project_like, ProjectLike.delete_changeset(like))
          |> Repo.transaction()

        case transaction do
          {:ok, changeset} -> {:ok, changeset}
          {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
        end

      _ ->
        {:error, :bad_request}
    end
  end

  @spec approve(ProjectLike.t()) :: {:ok, Chat.t()} | {:error, Ecto.Multi.name(), any()}
  defp approve(%ProjectLike{project_id: project_id, user_id: user_id} = project_like) do
    Multi.new()
    |> Multi.update(:approve, ProjectLike.approve_changeset(project_like, %{status: :approved}))
    |> Multi.insert_or_update(
      :add_member_to_project,
      Db.Projects.Member.changeset(%{project_id: project_id, user_id: user_id})
    )
    |> Multi.run(:main_chat, fn _repo, _ ->
      case Chats.main_chat(%{source_id: project_id, source_type: "Project"}) do
        %Chat{} = chat -> {:ok, chat}
        nil -> {:error, :not_found_main_chat}
      end
    end)
    |> Multi.run(:add_member_to_main_chat, fn _repo, %{main_chat: main_chat} ->
      Chats.add_member(%{chat_id: main_chat.id, user_id: user_id})
    end)
  end
end
