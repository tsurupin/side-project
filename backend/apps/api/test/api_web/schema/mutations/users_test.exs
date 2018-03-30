defmodule ApiWeb.Schema.Mutations.UsersTest do
  use ApiWeb.ConnCase, async: true

  describe "users signup" do
    @mutation """
    mutation ($providerId: String!, $uid: String!) {
      signUp(providerId: $providerId, uid: $uid) {
        token
      }
    }
    """
    test "creates a new user" do
      attrs = %{providerId: "facebook", uid: "1"}
      conn = build_conn()
      conn = post(conn, "/api", %{query: @mutation, variables: attrs})
      response = json_response(conn, 200)

      refute is_nil(response["data"]["signUp"]["token"])
    end
  end
end
