defmodule ApiWeb.Schema.Queries.SkillsTest do
  use ApiWeb.ConnCase, async: false

  import Mock
  describe "skills query" do
    setup do
      ruby_skill = Factory.insert(:skill, name: "Ruby")
      python_skill = Factory.insert(:skill, name: "Python")

      {:ok, ruby_skill: ruby_skill, python_skill: python_skill}
    end

    @query """
      query Skills($name: String!) {
        skills(name: $name) {
         ... on Skill {
            id
            name
          }
        }
      }

    """

    test "return skills with term", %{ruby_skill: ruby_skill} do
      user = Factory.insert(:user, display_name: "test")
      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user.id}")
          |> get("/api", %{query: @query, variables: %{name: "Ruby"}})


        response = json_response(conn, 200)
        expected_result = %{"skills" => [%{"id" => "#{ruby_skill.id}", "name" => ruby_skill.name}]}

        assert response["data"] == expected_result
      end

    end
  end
end
