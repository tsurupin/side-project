defmodule ApiWeb.Schema.Mutations.SkillsTest do
  use ApiWeb.ConnCase, async: true

  import Mock

  describe "create" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user_id: user.id
      }
    end

    @mutation """
      mutation ($name: String!) {
        createSkill(name: $name) {
          id
        }
      }
    """
    test "creates a new skill", %{user_id: user_id} do
      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: %{name: "new_name"}})

        response = json_response(conn, 200)

        assert response["data"]["createSkill"]["id"]
        new_skill = Repo.get(Db.Skills.Skill, response["data"]["create_skill"]["id"])
        assert new_skill.name == "new_name"
      end
    end

    test "return existing skill when the skill exist", %{user_id: user_id} do
      existing_skill = Factory.insert(:skill, name: "existing_name")

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: %{name: "existing_name"}})

        response = json_response(conn, 200)

        assert response["data"]["createSkill"]["id"] == "#{existing_skill.id}"
      end
    end
  end
end
