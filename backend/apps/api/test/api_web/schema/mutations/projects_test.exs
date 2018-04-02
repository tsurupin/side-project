defmodule ApiWeb.Schema.Mutations.ProjectsTest do
  use ApiWeb.ConnCase, async: true

  import Mock

  describe "create a project" do
    setup do
      user = Factory.insert(:user)
      {
        :ok,
        user: user
      }
    end
    @mutation """
      mutation ($name: String!, $leadSentence: String, $motivation: String, $requirement: String, $genreId: Int, $skillIds: [Int]) {
        createProject(projectInput: {name: $name, leadSentence: $leadSentence, motivation: $motivation, requirement: $requirement, genreId: $genreId, skillIds: $skillIds}) {
          id
          name
          status
        }
      }
    """
    test "creates a new project", %{user: user} do
      user_id = user.id
      attrs = %{name: "New Project", leadSentence: "aaa"}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})
        response = json_response(conn, 200)

        project = Repo.get_by(Db.Projects.Project, name: "New Project")
        assert project.owner_id == user_id
        assert response["data"]["createProject"]["name"] == "New Project"
      end
    end

    test "creates a new project with skills", %{user: user} do
      user_id = user.id
      skill1 = Factory.insert(:skill)
      skill2 = Factory.insert(:skill)
      attrs = %{name: "New Project", skillIds: [skill1.id, skill2.id], requirement: "rrequirement", motivation: "motivation"}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})
        response = json_response(conn, 200)

        assert Repo.get_by(Db.Skills.ProjectSkill, skill_id: skill1.id)
        assert Repo.get_by(Db.Skills.ProjectSkill, skill_id: skill2.id)

        assert response["data"]["createProject"]["name"] == "New Project"
      end
    end

    test "fails to create a new project with skills because one of skills doesn't exist", %{user: user} do
      user_id = user.id
      attrs = %{name: "New Project", skillIds: [1], requirement: "rrequirement", motivation: "motivation"}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})
        response = json_response(conn, 200)
        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message
      end
    end

    test "fails to create a new project becaue the project name exists", %{user: user} do
      user_id = user.id
      Factory.insert(:project, owner: user, name: "New Project")
      attrs = %{name: "New Project", leadSentence: "aaa"}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})
        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        refute is_nil(message)
      end
    end
  end

  describe "edit a project" do
    setup do
      old_genre = Factory.insert(:genre)
      user = Factory.insert(:user)
      project = Factory.insert(:project, genre: old_genre, owner: user)

      {
        :ok,
        user: user,
        project: project
      }
    end
    @mutation """
      mutation ($id: Int!, $name: String!, $leadSentence: String, $motivation: String, $requirement: String, $genreId: Int, $skillIds: [Int]) {
        editProject(id: $id, projectInput: {name: $name, leadSentence: $leadSentence, motivation: $motivation, requirement: $requirement, genreId: $genreId, skillIds: $skillIds}) {
          id
          name
          status
        }
      }
    """
    test "edits project", %{project: project, user: user} do
      user_id = user.id
      new_genre = Factory.insert(:genre)
      attrs = %{id: project.id, name: "project neo", genreId: new_genre.id}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})
        response = json_response(conn, 200)

        project = Repo.get(Db.Projects.Project, project.id)
        assert project.name == "project neo"
        assert project.genre_id == new_genre.id
        assert response["data"]["editProject"]["name"] == "project neo"
      end
    end

    test "fails to edit project because user is not the project owner", %{project: project, user: user} do
      user_id = user.id
      new_genre = Factory.insert(:genre)
      attrs = %{id: project.id + 1, name: "project neo", genreId: new_genre.id}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})
        %{"errors" => [%{"message" => message} | _tail]}  = json_response(conn, 200)

        assert message == "not_authorized"
      end
    end

    # test "fails to create a new project becaue the project name exists", %{user: user} do
    #   user_id = user.id
    #   Factory.insert(:project, owner: user, name: "New Project")
    #   attrs = %{name: "New Project", leadSentence: "aaa"}
    #   with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
    #     conn =
    #       build_conn()
    #       |> put_req_header("authorization", "Bearer #{user_id}")
    #       |> post("/api", %{query: @mutation, variables: attrs})
    #     %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)
    #
    #     refute is_nil(message)
    #   end
    # end
  end
end
