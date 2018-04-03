defmodule ApiWeb.Schema.Resolvers.Likes do
  alias Db.Likes.Likes

  def like(_parent, %{target_user_id: target_user_id}, %{context: %{current_user: current_user}}) do
    case Likes.like(%{target_user_id: target_user_id, user_id: current_user.id}) do
      {:ok, _} -> {:ok, true}
      {:error, reason} -> {:error, reason}
    end
  end

  def withdraw_like(_parent, %{target_user_id: target_user_id}, %{context: %{current_user: current_user}}) do
    case Likes.withdraw_like(%{target_user_id: target_user_id, user_id: current_user.id}) do
      {:ok, _} -> {:ok, true}
      {:error, reason} -> {:error, reason}
    end
  end

  def accept_like(_parent, %{like_id: like_id}, %{context: %{current_user: current_user}}) do
    case Likes.accept_like(current_user, %{like_id: like_id}) do
      {:ok, _} -> {:ok, true}
      {:error, reason} -> {:error, reason}
    end
  end

  def reject_like(_parent, %{like_id: like_id}, %{context: %{current_user: current_user}}) do
    case Likes.reject_like(current_user, %{like_id: like_id}) do
      {:ok, _} -> {:ok, true}
      {:error, reason} -> {:error, reason}
    end
  end
end
