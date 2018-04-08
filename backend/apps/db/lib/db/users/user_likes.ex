defmodule Db.Users.UserLikes do
  @moduledoc """
  The UserLike context.
  """

  import Ecto.Query, warn: false
  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]

  alias Ecto.Multi

  alias Db.Repo
  alias Db.Users.{User, UserLike}
  alias Db.Chats.Chats


  def like(%{target_user_id: target_user_id, user_id: user_id} = attrs) do
     case UserLike.changeset(attrs) |> Repo.insert do
        {:ok, like} -> {:ok, like}
        {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
     end
  end

  def withdraw_like(%{target_user_id: target_user_id, user_id: user_id} = attrs) do
    case Repo.get_by(UserLike, attrs) do
      %UserLike{status: :requested} = like ->
        case Repo.delete(like) do
          {:ok, _like} -> {:ok, _like}
          {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
        end
       _ -> {:error, :bad_request}
    end
  end

  def accept_like(%User{id: target_user_id}, %{like_id: like_id}) do
    case Repo.get_by(UserLike, id: like_id, target_user_id: target_user_id) do
       %UserLike{status: :requested} = like ->
         transaction =
           Multi.new
           |> Multi.update(:accept_like, UserLike.change_status_changeset(like, %{status: :approved}))
           |> Multi.run(:create_chat, fn _ ->
             Chats.create_chat_group(%{like: like})
           end)
           |> Repo.transaction

          case transaction do
            {:ok, %{create_chat: %{chat: chat}}} -> {:ok, chat}
            {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
          end
        _ -> {:error, :bad_request}
    end
  end

  def reject_like(%User{id: target_user_id}, %{like_id: like_id}) do
    case Repo.get_by(UserLike, id: like_id, target_user_id: target_user_id) do

       %UserLike{status: :requested} = like ->
         transaction =
           UserLike.change_status_changeset(like, %{status: :rejected})
           |> Repo.update
        case transaction do
          {:ok, chat} -> {:ok, chat}
          {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
        end
       _ -> {:error, :bad_request}
    end
  end



end