defmodule ApiWeb.Schema.Mutations.ProjectsTest do
  use ApiWeb.ConnCase, async: true

  import Mock

  describe "create a roject" do
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
end
