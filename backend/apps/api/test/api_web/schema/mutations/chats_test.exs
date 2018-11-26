defmodule ApiWeb.Schema.Mutations.ChatsTest do
  use ApiWeb.ConnCase, async: false

  import Mock

  describe "create" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user: user
      }
    end

    @mutation """
      mutation ($chatId: Int!, $comment: String, $image: Upload) {
        createMessage(messageInput: {chatId: $chatId, comment: $comment, image: $image}) {
          chatId
          comment
          imageUrl
          user {
            id
          }
        }
      }
    """
    test "creates a new message", %{user: user} do
      user_id = user.id
      chat = Factory.insert(:chat)
      Factory.insert(:chat_member, chat: chat, user: user)
      attrs = %{chatId: chat.id, comment: "New Comment"}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        assert response["data"]["createMessage"]["comment"] == "New Comment"
        new_message = Repo.get_by(Db.Chats.Message, user_id: user_id, chat_id: chat.id)
        assert new_message
      end
    end

    test "fails to create a message when no content is sent", %{user: user} do
      user_id = user.id
      chat = Factory.insert(:chat)
      Factory.insert(:chat_member, chat: chat, user: user)
      attrs = %{chatId: chat.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message == "comment: should be present"
      end
    end
  end
end
