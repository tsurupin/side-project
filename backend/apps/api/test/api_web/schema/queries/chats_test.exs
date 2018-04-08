defmodule ApiWeb.Schema.Queries.ChatsTest do
  use ApiWeb.ConnCase, async: true
  import Mock
  alias Db.Uploaders.ChatImageUploader

  describe "chat query" do
    setup do
      user = Factory.insert(:user)
      chat = Factory.insert(:chat)
      message1 = Factory.insert(:chat_comment_message, chat: chat)
      message2 = Factory.insert(:chat_image_message, chat: chat)

      {
        :ok,
        user_id: user.id,
        chat: chat,
        message1: message1,
        message2: message2,
        message2_image_url: ChatImageUploader.url({message2.image_url, message2}, :thumb)
      }
    end

    @query """
      query($id: ID!) {
        chat(id: $id) {
          id
          name
          messages {
            id
            comment
            imageUrl
          }
        }
      }

    """

    test "return chat with messages", %{user_id: user_id, chat: chat, message1: message1, message2: message2, message2_image_url: message2_image_url} do

      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> get("/api", %{query: @query, variables: %{id: chat.id}})
        response = json_response(conn, 200)
        expected_result = %{
          "chat" => %{
            "id" => "#{chat.id}",
            "name" => chat.name,
            "messages" => [
              %{
                "id" => "#{message1.id}",
                "comment" => message1.comment,
                "imageUrl" => nil
              },
              %{
                "id" => "#{message2.id}",
                "comment" => nil,
                "imageUrl" => message2_image_url
              }
            ]
          }
        }

        assert response["data"] == expected_result
      end
    end
  end
end
