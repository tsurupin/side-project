defmodule Db.ProjectLikesTest do
  use Db.DataCase
  alias Db.Users.{ProjectLikes, ProjectLike}
  alias Db.Repo

  describe "like/1" do
    test "succeeds to like a project" do
      project = Factory.insert(:project)
      user = Factory.insert(:user)
      {:ok, %{chat: main_chat}} = Db.Chats.Chats.create_chat_group(%{project: project})

      assert {:ok, chat} = ProjectLikes.like(%{project_id: project.id, user_id: user.id})
      assert chat.id == main_chat.id
      project_like = Repo.get_by(ProjectLike, project_id: project.id, user_id: user.id)
      assert project_like.status == :approved
      assert Repo.get_by(Db.Projects.Member, project_id: project.id, user_id: user.id)
      assert Repo.get_by(Db.Chats.Member, chat_id: chat.id, user_id: user.id)
    end

    test "fails to like a project because main chat is not found" do
      project = Factory.insert(:project)
      user = Factory.insert(:user)

      assert {:error, "main chat is not found"} =
               ProjectLikes.like(%{project_id: project.id, user_id: user.id})
    end
  end

  describe "withdraw_like/1" do
    test "returns :bad_request when project_like is not found" do
      inputs = %{project_id: 1, user_id: 1}
      assert {:error, :bad_request} = ProjectLikes.withdraw_like(inputs)
    end

    test "succeeds to delete project_like when existing like status is requested" do
      project_like = Factory.insert(:project_like, status: :requested)
      inputs = %{project_id: project_like.project_id, user_id: project_like.user_id}
      assert {:ok, _like} = ProjectLikes.withdraw_like(inputs)
    end

    test "succeeds to delete project_like when existing like status is approved" do
      import Ecto.Query, only: [from: 2]
      project = Factory.insert(:project)
      user = Factory.insert(:user)
      {:ok, %{chat: chat}} = Db.Chats.Chats.create_chat_group(%{project: project})

      assert {:ok, _chat} = ProjectLikes.like(%{project_id: project.id, user_id: user.id})

      inputs = %{project_id: project.id, user_id: user.id}
      assert {:ok, changeset} = ProjectLikes.withdraw_like(inputs)

      assert is_nil(
               Repo.one(
                 from(m in Db.Projects.Member,
                   where:
                     m.project_id == ^project.id and m.user_id == ^user.id and
                       is_nil(m.deleted_at)
                 )
               )
             )

      assert is_nil(
               Repo.one(
                 from(m in Db.Chats.Member,
                   where: m.chat_id == ^chat.id and m.user_id == ^user.id and is_nil(m.deleted_at)
                 )
               )
             )

      assert is_nil(
               Repo.one(
                 from(pl in Db.Users.ProjectLike,
                   where:
                     pl.project_id == ^project.id and pl.user_id == ^user.id and
                       is_nil(pl.deleted_at)
                 )
               )
             )
    end
  end
end
