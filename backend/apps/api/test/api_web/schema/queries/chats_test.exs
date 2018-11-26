defmodule ApiWeb.Schema.Queries.ChatsTest do
  use ApiWeb.ConnCase, async: false
  import Mock
  alias Db.Uploaders.ChatImageUploader

  describe "query Chat" do
    setup do
      user = Factory.insert(:user)
      chat = Factory.insert(:chat)
      message1 = Factory.insert(:chat_comment_message, chat: chat, user: user)
      message2 = Factory.insert(:chat_image_message, chat: chat, user: user)

      {
        :ok,
        user: user,
        chat: chat,
        message1: message1,
        message2: message2,
        message2_image_url: ChatImageUploader.url({message2.image_url, message2}, :thumb)
      }
    end

    @query """
      query Chat($id: ID!) {
        chat(id: $id) {
          id
          name
          messages {
            id
            comment
            imageUrl
            user {
              id
              displayName
              mainPhotoUrl
            }
          }
        }
      }
    """

    test "returns chat with messages", %{
      user: user,
      chat: chat,
      message1: message1,
      message2: message2,
      message2_image_url: message2_image_url
    } do
      user_id = user.id

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> get("/api", %{query: @query, variables: %{id: chat.id}})

        response = json_response(conn, 200)

        missing_image_url = "https://placehold.it/100x100"

        expected_result = %{
          "chat" => %{
            "id" => "#{chat.id}",
            "name" => chat.name,
            "messages" => [
              %{
                "id" => "#{message1.id}",
                "comment" => message1.comment,
                "imageUrl" => nil,
                "user" => %{
                  "id" => "#{user.id}",
                  "displayName" => user.display_name,
                  "mainPhotoUrl" => missing_image_url
                }
              },
              %{
                "id" => "#{message2.id}",
                "comment" => nil,
                "imageUrl" => message2_image_url,
                "user" => %{
                  "id" => "#{user.id}",
                  "displayName" => user.display_name,
                  "mainPhotoUrl" => missing_image_url
                }
              }
            ]
          }
        }

        assert response["data"] == expected_result
      end
    end
  end
end
