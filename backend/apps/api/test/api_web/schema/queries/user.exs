defmodule ApiWeb.Schema.Queries.User do
  use ApiWeb.ConnCase, async: true

  setup do

  end

  @query """
    query($id: ID!) {
      user(id: $id) {
        user
      }
    }
  """
  test "user fields return user" do
    
    conn = build_conn()
    conn = get(conn, "/api", query: @query)

    assert json_response(conn, 200) == %{

    }
  end
end
