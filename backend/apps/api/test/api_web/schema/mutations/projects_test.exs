defmodule ApiWeb.Schema.Mutations.ProjectsTest do
  use ApiWeb.ConnCase, async: false

  import Mock

  describe "mutation CreateProject" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user: user
      }
    end

    @mutation """
      mutation CreateProject($title: String!, $leadSentence: String, $motivation: String, $requirement: String, $genreId: ID, $skillIds: [ID]) {
        createProject(projectInput: {title: $title, leadSentence: $leadSentence, motivation: $motivation, requirement: $requirement, genreId: $genreId, skillIds: $skillIds}) {
          id
          title
          status
        }
      }
    """
    test "succeeds to create a new project", %{user: user} do
      user_id = user.id
      attrs = %{title: "New Project", leadSentence: "aaa"}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        project = Repo.get_by(Db.Projects.Project, title: "New Project")
        assert project.owner_id == user_id
        assert response["data"]["createProject"]["title"] == "New Project"
      end
    end

    test "succeeds to create a new project with skills", %{user: user} do
      user_id = user.id
      skill1 = Factory.insert(:skill)
      skill2 = Factory.insert(:skill)

      attrs = %{
        title: "New Project",
        skillIds: ["#{skill1.id}", "#{skill2.id}"],
        requirement: "rrequirement",
        motivation: "motivation"
      }

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        assert Repo.get_by(Db.Skills.ProjectSkill, skill_id: skill1.id)
        assert Repo.get_by(Db.Skills.ProjectSkill, skill_id: skill2.id)

        assert response["data"]["createProject"]["title"] == "New Project"
      end
    end

    test "fails to create a new project with skills because one of skills doesn't exist", %{
      user: user
    } do
      user_id = user.id

      attrs = %{
        title: "New Project",
        skillIds: ["100000000"],
        requirement: "requirement",
        motivation: "motivation"
      }

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message
      end
    end

    test "fails to create a new project becaue the project title exists", %{user: user} do
      user_id = user.id
      Factory.insert(:project, owner: user, title: "New Project")
      attrs = %{title: "New Project", leadSentence: "aaa"}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        refute is_nil(message)
      end
    end
  end

  describe "mutation EditProject" do
    setup do
      old_genre = Factory.insert(:genre)
      user = Factory.insert(:user)
      project = Factory.insert(:project, genre: old_genre, owner: user)

      {
        :ok,
        user: user, project: project
      }
    end

    @mutation """
      mutation EditProject($id: ID!, $title: String!, $leadSentence: String, $motivation: String, $requirement: String, $genreId: ID, $skillIds: [ID]) {
        editProject(id: $id, projectInput: {title: $title, leadSentence: $leadSentence, motivation: $motivation, requirement: $requirement, genreId: $genreId, skillIds: $skillIds}) {
          id
          title
          status
        }
      }
    """
    test "succeeds to edit a project", %{project: project, user: user} do
      user_id = user.id
      new_genre = Factory.insert(:genre)

      Factory.insert(:project_member,
        project: project,
        user: user,
        status: :approved,
        role: :master
      )

      attrs = %{id: project.id, title: "project neo", genreId: new_genre.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        project = Repo.get(Db.Projects.Project, project.id)
        assert project.title == "project neo"
        assert project.genre_id == new_genre.id
        assert response["data"]["editProject"]["title"] == "project neo"
      end
    end

    test "fails to edit project because user is not the project owner", %{
      project: project,
      user: user
    } do
      user_id = user.id
      new_genre = Factory.insert(:genre)
      attrs = %{id: "#{project.id + 1}", title: "project neo", genreId: new_genre.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message == "unauthorized"
      end
    end
  end

  describe "mutation DeleteProjectPhoto" do
    setup do
      user = Factory.insert(:user)
      project = Factory.insert(:project, owner: user)

      {
        :ok,
        user: user, project: project
      }
    end

    @mutation """
      mutation DeleteProjectPhoto($photoId: ID!) {
        deleteProjectPhoto(photoId: $photoId) {
          id
          rank
          projectId
          imageUrl
        }
      }
    """

    test "succed to delete a project photo", %{user: user, project: project} do
      current_photo = Factory.insert(:project_photo, project: project, rank: 0)
      other_photo = Factory.insert(:project_photo, project: project, rank: 1)
      attrs = %{photoId: "#{current_photo.id}"}
      user_id = user.id

      with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        assert response["data"]["deleteProjectPhoto"]["id"] == "#{current_photo.id}"

        promoted_photo = Repo.get(Db.Projects.Photo, other_photo.id)

        assert promoted_photo.rank == current_photo.rank

        current_photo = Repo.get(Db.Projects.Photo, current_photo.id)
        assert current_photo.deleted_at
      end
    end

    # test "deletes project photo", %{user: user, project: project} do
    #   photo = Factory.insert(:project_photo, project: project, rank: 1)
    #   other_photo = Factory.insert(:project_photo, project: project, rank: 2)
    #   attrs = %{photoId: "#{photo.id}"}
    #   user_id = user.id

    #   with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
    #     conn =
    #       build_conn()
    #       |> put_req_header("authorization", "Bearer #{user_id}")
    #       |> post("/api", %{query: @mutation, variables: attrs})

    #     response = json_response(conn, 200)
    #     assert response["data"]["deleteProjectPhoto"] == true

    #     promoted_photo = Repo.get(Db.Projects.Photo, other_photo.id)
    #     assert promoted_photo.rank == photo.rank

    #     photo = Repo.get(Db.Projects.Photo, photo.id)
    #     assert is_nil(photo)
    #   end
    # end

    test "fails to delete a photo because project owner is not current_user", %{user: user} do
      other_project = Factory.insert(:project)
      photo = Factory.insert(:project_photo, project: other_project, rank: 1)

      attrs = %{photoId: "#{photo.id}"}
      user_id = user.id

      with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message == "unauthorized"
      end
    end

    test "fails to delete a photo because photo is not found", %{user: user} do
      attrs = %{photoId: "1000000"}
      user_id = user.id

      with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message == "not_found"
      end
    end
  end

  describe "mutation ChangeProjectStatus" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user: user
      }
    end

    @mutation """
      mutation ChangeProjectStatus($projectId: ID!, $status: String!) {
        changeProjectStatus(projectId: $projectId, status: $status)
      }
    """
    test "succeeds to changes project status", %{user: user} do
      project = Factory.insert(:project, owner: user, status: :editing)
      attrs = %{projectId: "#{project.id}", status: "completed"}
      user_id = user.id

      with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        assert response["data"]["changeProjectStatus"] == true

        project = Repo.get(Db.Projects.Project, project.id)
        assert project.status == :completed

        group = Repo.get_by(Db.Chats.Group, source_id: project.id, source_type: "Project")
        assert group
        chat = Repo.get_by(Db.Chats.Chat, chat_group_id: group.id)
        assert chat
        chat_member = Repo.get_by(Db.Chats.Member, chat_id: chat.id, user_id: project.owner_id)
        assert chat_member
      end
    end

    test "fails to change project status because lead_sentence is not present", %{user: user} do
      project = Factory.insert(:project, owner: user, lead_sentence: nil, status: :editing)
      attrs = %{projectId: "#{project.id}", status: "completed"}
      user_id = user.id

      with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        project = Repo.get(Db.Projects.Project, project.id)
        assert project.status == :editing
        assert message == "status: is invalid"
      end
    end

    test "fails to change project status because project owner is not current user", %{user: user} do
      other_project = Factory.insert(:project)

      attrs = %{projectId: "#{other_project.id}", status: "completed"}
      user_id = user.id

      with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message == "unauthorized"
      end
    end
  end
end
