defmodule ApiWeb.Schema.Queries.UserTest do
  use ApiWeb.ConnCase, async: true

  describe "user query" do
    setup do
      user = Factory.insert(:user)
      user_skill = Factory.insert(:user_skill, user: user)
      user_photo = Factory.insert(:user_photo, user: user)
      IO.inspect(user_photo)
      {:ok, user: user}
    end

    @query """
      query($id: ID!) {
        user(id: $id) {
          id
          displayName
          schoolName
          genre {
            id
            name
          }
          occupationType {
            id
            name
          }
          status
          areaName
          country {
            id
            name
          }
          skills {
            id
            name
          }
        }
      }

    """
    test "user fields return user", %{user: user} do
      IO.inspect(user.id)
      conn = build_conn()
      conn = get(conn, "/api", %{query: @query, variables: %{id: user.id}})
      IO.inspect(conn)
      response = json_response(conn, 200)
      IO.inspect(response)
      expected_result = %{}
      assert response == expected_result
    end
  end

end
