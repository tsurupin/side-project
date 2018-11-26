defmodule ApiWeb.Schema.Subscriptions.ChatsTest do
  use ApiWeb.SubscriptionCase

  import Mock

  describe "subscription NewMessage" do
    setup do
      :ok
    end

    @subscription """
      subscription NewMessage($chatId: ID!) {
        newMessage(chatId: $chatId) {
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
    """

    @mutation """
      mutation CreateMessage($chatId: ID!, $comment: String, $image: Upload) {
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

    test "receives a new message when new message is created", _ctx do
      chat1 = Factory.insert(:chat)
      chat2 = Factory.insert(:chat)
      user = Factory.insert(:user)
      Factory.insert(:chat_member, chat: chat1, user: user)

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        {:ok, socket} = Phoenix.ChannelTest.connect(ApiWeb.UserSocket, %{token: user.id})
        {:ok, socket} = Absinthe.Phoenix.SubscriptionTest.join_absinthe(socket)

        ref = push_doc(socket, @subscription, variables: %{"chatId" => "#{chat1.id}"})
        assert_reply(ref, :ok, %{subscriptionId: subscription_id})

        ref =
          push_doc(socket, @mutation,
            variables: %{"chatId" => "#{chat1.id}", comment: "New Comment"}
          )

        assert_reply(ref, :ok, reply)

        ref =
          push_doc(socket, @mutation,
            variables: %{"chatId" => "#{chat2.id}", comment: "New Comment2"}
          )

        assert_reply(ref, :ok, reply)

        message = Repo.get_by(Db.Chats.Message, chat_id: chat1.id)
        channel_name = "new_message:#{chat1.id}"

        assert_push(channel_name, push)

        expected = %{
          result: %{
            data: %{
              "newMessage" => %{
                "comment" => "New Comment",
                "id" => "#{message.id}",
                "imageUrl" => nil,
                "user" => %{
                  "id" => "#{user.id}",
                  "displayName" => user.display_name,
                  "mainPhotoUrl" => "https://placehold.it/100x100"
                }
              }
            }
          },
          subscriptionId: subscription_id
        }

        assert expected == push
      end
    end
  end
end
