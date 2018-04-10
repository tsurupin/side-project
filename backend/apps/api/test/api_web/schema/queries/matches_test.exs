defmodule ApiWeb.Schema.Queries.MatchesTest do
  use ApiWeb.ConnCase, async: false
  import Mock
  alias Db.Uploaders.UserPhotoUploader

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
      Factory.insert(:chat_member, chat: chat3)
      Factory.insert(:user_like, user: liked_user1, target_user: user, status: 0)
      Factory.insert(:user_like, user: liked_user2, target_user: user, status: 0)
      Factory.insert(:user_like, user: other_user, target_user: user, status: 1)

      photo = Factory.insert(:user_photo, user: liked_user1, is_main: true)

      {
        :ok,
        user_id: user.id,
        liked_user1: liked_user1,
        liked_user2: liked_user2,
        liked_user1_photo_url: UserPhotoUploader.url({photo.image_url, photo}, :thumb),
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
        liked_user1_photo_url: liked_user1_photo_url,
        chat1: chat1,
        chat2: chat2
      } = ctx

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> get("/api", %{query: @query})

        response = json_response(conn, 200)

        expected_result = %{
          "matchList" => %{
            "chatList" => [
              %{
                "id" => "#{chat1.id}",
                "name" => chat1.name
              },
              %{
                "id" => "#{chat2.id}",
                "name" => chat2.name
              }
            ],
            "likedUserList" => [
              %{
                "displayName" => liked_user1.display_name,
                "mainPhotoUrl" => liked_user1_photo_url
              },
              %{
                "displayName" => liked_user2.display_name,
                "mainPhotoUrl" => nil
              }
            ]
          }
        }

        assert response["data"] == expected_result
      end
    end
  end
end
