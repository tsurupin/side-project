defmodule Db.MessageTest do
  use Db.DataCase
  alias Db.Chats.Message

  describe "changeset" do
    test "set uuid if nil" do
      chat = Factory.insert(:chat)
      user = Factory.insert(:user)

      %{changes: changes} = Message.changeset(%{chat_id: chat.id, user_id: user.id})
      refute is_nil(changes.uuid)
    end

    test "validate if user is not member of the chat" do
      chat = Factory.insert(:chat)
      user = Factory.insert(:user)

      changeset = Message.changeset(%{chat_id: chat.id, user_id: user.id, message_type: "comment", comment: "hoge"})
      assert Db.FullErrorMessage.message(changeset) == "user_id: user should be member of the chat"
    end

    test "validate if message_type is upload and image_url is nil" do
      chat = Factory.insert(:chat)
      user = Factory.insert(:user)
      chat_member = Factory.insert(:chat_member, chat: chat, user: user)

      changeset = Message.changeset(%{chat_id: chat.id, user_id: user.id, message_type: "upload"})

      assert Db.FullErrorMessage.message(changeset) == "image_url: image_url should be present"
    end

    test "validate if message_type is comment and comment is nil" do
      chat = Factory.insert(:chat)
      user = Factory.insert(:user)
      chat_member = Factory.insert(:chat_member, chat: chat, user: user)

      changeset = Message.changeset(%{chat_id: chat.id, user_id: user.id, message_type: "comment"})
      assert Db.FullErrorMessage.message(changeset) == "comment: comment should be present"
    end
  end

end

