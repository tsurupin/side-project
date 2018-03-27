defmodule ApiWeb.Schema.Queries.MatchesTest do
  use ApiWeb.ConnCase, async: true
  import Mock

  describe "match query" do
    setup do
      user = Factory.insert(:user)
      liked_user1 = Factory.insert(:user)
      liked_user2 = Factory.insert(:user)
      other_user = Factory.insert(:user)
      chat1 = Factory.insert(:chat)
      chat2 = Factory.insert(:chat)
      chat3 = Factory.insert(:chat)
      Factory.insert(:chat_member, chat: chat1, user: user)
      Factory.insert(:chat_member, chat: chat2, user: user)
      Factory.insert(:chat_member, chat: chat3, user: user)
      Factory.insert(:user_like, user: liked_user1, target_user: user, status: 0)
      Factory.insert(:user_like, user: liked_user2, target_user: user, status: 0)
      Factory.insert(:user_like, user: other_user, target_user: user, status: 1)

      {
        :ok,
        user_id: user.id,
        liked_user1: liked_user1,
        liked_user2: liked_user2,
        chat1: chat1,
        chat2: chat2
      }
    end


    @query """
      query {
        matchList {
          likedUserList {
            displayName
            mainPhotoUrl
          }
          chatList {
            id
            name
          }
        }
      }
    """

    test "return matchList", ctx do
      %{
        user_id: user_id,
        liked_user1: liked_user1,
        liked_user2: liked_user2,
        chat1: chat1,
        chat2: chat2
      } = ctx
      IO.inspect(user_id)
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> get("/api", %{query: @query})

        response = json_response(conn, 200)
        expected_result = %{

        }

        assert response["data"] == expected_result
      end
    end
  end
end
