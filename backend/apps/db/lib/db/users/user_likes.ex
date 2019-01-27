defmodule Db.Users.UserLikes do
  @moduledoc """
  UserLike context.
  """

  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2], warn: false

  alias Ecto.Multi

  alias Db.Repo
  alias Db.Users.{User, UserLike, AliveUserLike}
  alias Db.Chats.{Chats, Chat}

  @spec like(%{target_user_id: integer, user_id: integer}) ::
          {:ok, AliveUserLike.t()} | {:error, String.t()}
  def like(%{target_user_id: _target_user_id, user_id: _user_id} = attrs) do
    case AliveUserLike.changeset(attrs) |> Repo.insert() do
      {:ok, _user_like} -> {:ok, true}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec withdraw_like(%{target_user_id: integer, user_id: integer}) ::
          {:ok, any} | {:error, String.t()} | {:error, :bad_request}
  def withdraw_like(%{target_user_id: target_user_id, user_id: user_id}) do
    case Repo.get_by(AliveUserLike,
           target_user_id: target_user_id,
           user_id: user_id,
           status: :requested
         ) do
      %AliveUserLike{} = like ->
        case Repo.update(UserLike.delete_changeset(like)) do
          {:ok, _user_like} -> {:ok, true}
          {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
        end

      _ ->
        {:error, :bad_request}
    end
  end

  @spec accept_like(User.t(), %{user_id: integer}) ::
          {:ok, Chat.t()} | {:error, String.t()} | {:error, :bad_request}
  def accept_like(%User{id: target_user_id}, %{user_id: user_id}) do
    case Repo.get_by(AliveUserLike,
           user_id: user_id,
           target_user_id: target_user_id,
           status: :requested
         ) do
      %AliveUserLike{} = like ->
        transaction =
          Multi.new()
          |> Multi.update(
            :accept_like,
            AliveUserLike.change_status_changeset(like, %{status: :approved})
          )
          |> Multi.run(:create_chat, fn _repo, _ ->
            Chats.create_chat_group(%{like: like})
          end)
          |> Repo.transaction()

        case transaction do
          {:ok, %{create_chat: %{chat: chat}}} -> {:ok, chat}
          {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
        end

      _ ->
        {:error, :bad_request}
    end
  end

  @spec reject_like(User.t(), %{user_id: integer}) ::
          {:ok, true} | {:error, String.t()} | {:error, :bad_request}
  def reject_like(%User{id: target_user_id}, %{user_id: user_id}) do
    case Repo.get_by(AliveUserLike,
           user_id: user_id,
           target_user_id: target_user_id,
           status: :requested
         ) do
      %AliveUserLike{} = like ->
        transaction =
          AliveUserLike.change_status_changeset(like, %{status: :rejected})
          |> Repo.update()

        case transaction do
          {:ok, _user_like} -> {:ok, true}
          {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
        end

      _ ->
        {:error, :bad_request}
    end
  end
end
