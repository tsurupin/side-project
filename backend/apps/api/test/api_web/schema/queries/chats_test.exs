defmodule ApiWeb.Schema.Queries.ChatsTest do
  use ApiWeb.ConnCase, async: true
  import Mock
  alias Db.Uploaders.ChatImageUploader

  describe "chat query" do
    setup do
      user = Factory.insert(:user)
      chat = Factory.insert(:chat)
      content1 = Factory.insert(:chat_message_content, chat: chat)
      content2 = Factory.insert(:chat_image_content, chat: chat)

      {
        :ok,
        user_id: user.id,
        chat: chat,
        content1: content1,
        content2: content2,
        content2_image_url: ChatImageUploader.url({content2.image_url, content2}, :thumb)
      }
    end

    @query """
      query($id: ID!) {
        chat(id: $id) {
          id
          name
          contents {
            id
            message
            imageUrl
          }
        }
      }

    """

    test "return chat with contents", %{user_id: user_id, chat: chat, content1: content1, content2: content2, content2_image_url: content2_image_url} do

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
            "contents" => [
              %{
                "id" => "#{content1.id}",
                "message" => content1.message,
                "imageUrl" => nil
              },
              %{
                "id" => "#{content2.id}",
                "message" => nil,
                "imageUrl" => content2_image_url
              }
            ]
          }
        }

        assert response["data"] == expected_result
      end
    end
  end
end
