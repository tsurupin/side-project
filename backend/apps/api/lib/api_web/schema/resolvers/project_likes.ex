defmodule ApiWeb.Schema.Resolvers.ProjectLikes do
  alias Db.Users.ProjectLikes

  def like(_parent, %{project_id: project_id}, %{context: %{current_user: current_user}}) do
    case ProjectLikes.like(%{project_id: project_id, user_id: current_user.id}) do
      {:ok, chat} -> {:ok, chat}
      {:error, reason} -> {:error, reason}
    end
  end

  def withdraw_like(_parent, %{project_id: project_id}, %{context: %{current_user: current_user}}) do
    case ProjectLkes.withdraw_like(%{project_id: project_id, user_id: current_user.id}) do
      {:ok, _} -> {:ok, true}
      {:error, reason} -> {:error, reason}
    end
  end
end
