defmodule ApiWeb.Schema.Mutations.ProjectLikesTest do
  use ApiWeb.ConnCase, async: false
  import Mock

  describe "mutation LikeProject" do
    setup do
      user = Factory.insert(:user)
      project = Factory.insert(:project)

      {
        :ok,
        user: user, project: project
      }
    end

    @mutation """
      mutation LikeProject($projectId: Int!) {
        likeProject(projectId: $projectId) {
          id
        }
      }
    """
    test "likes project", %{user: user, project: project} do
      user_id = user.id
      chat_group = Factory.insert(:chat_group, source_id: project.id, source_type: "Project")
      chat = Factory.insert(:chat, chat_group: chat_group, is_main: true)

      attrs = %{projectId: project.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        project_member = Repo.get_by(Db.Projects.Member, project_id: project.id, user_id: user_id)
        chat_member = Repo.get_by(Db.Chats.Member, chat_id: chat.id, user_id: user_id)

        assert response["data"]["likeProject"]["id"] == "#{chat.id}"
        assert project_member
        assert chat_member
      end
    end
  end

  describe "mutation WithdrawProjectLike" do
    setup do
      user = Factory.insert(:user)
      project = Factory.insert(:project)

      {
        :ok,
        user: user, project: project
      }
    end

    @mutation """
      mutation WithdrawProjectLike($projectId: Int!) {
        withdrawProjectLike(projectId: $projectId)
      }
    """
    test "succceeds to withdraw like_project", %{user: user, project: project} do
      user_id = user.id
      chat_group = Factory.insert(:chat_group, source_id: project.id, source_type: "Project")
      chat = Factory.insert(:chat, chat_group: chat_group, is_main: true)
      Db.Users.ProjectLikes.like(%{project_id: project.id, user_id: user.id})

      attrs = %{projectId: project.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        project_member = Repo.get_by(Db.Projects.Member, project_id: project.id, user_id: user_id)
        chat_member = Repo.get_by(Db.Chats.Member, chat_id: chat.id, user_id: user_id)
        project_like = Repo.get_by(Db.Users.ProjectLike, project_id: project.id, user_id: user_id)

        assert response["data"]["withdrawProjectLike"]
        assert project_member.deleted_at
        assert chat_member.deleted_at
        refute project_like
      end
    end
  end
end
