defmodule Db.ChatsTest do
  use Db.DataCase
  alias Chats.Chats

  describe "get_by/1" do
    test "returns chat with id" do
      temp_chat = Factory.insert(:chat)
      {:ok, chat} = Chats.get_by(%{id: temp_chat.id})
      assert temp_chat.id === chat.id
    end

    test "returns not_foudn error" do
      assert Chats.get_by(%{id: 1}) == {:error, :not_found}
    end
  end

  describe "with_messages/1" do
    test "returns associated messages" do
      chat = Factory.insert(:chat)

      message = Factory.insert(:chat_comment_message, chat: chat)

      chat = Chats.with_messages(chat)
      assert Enum.map(chat.messages, & &1.id) == [message.id]
    end
  end

  describe "attended_chats/1" do
    test "returns chats" do
      # project = Factory.insert(:project)
      # group = Factory.
    end
  end

  describe "main_chat/1" do
    test "returns main_chat" do
      project = Factory.insert(:project)

      {:ok, %{chat: chat, chat_group: chat_group, chat_member: chat_member}} =
        Chats.create_chat_group(%{project: project})

      not_main_chat = Factory.insert(:chat, chat_group: chat_group, is_main: false)
      main_chat = Chats.main_chat(%{source_id: project.id, source_type: "Project"})
      refute main_chat.id == not_main_chat.id
      assert main_chat.is_main
    end
  end

  describe "create_chat_group/1" do
    test "succeds to create a chat with UserLike" do
      like = Factory.insert(:user_like)

      {:ok, %{chat: chat, chat_group: chat_group, chat_member: chat_member}} =
        Chats.create_chat_group(%{like: like})

      assert chat_group.source_id == like.id
      assert chat_group.source_type == "UserLike"
      assert chat.name == "Private"
      assert chat_member["chat_member:#{like.user_id}"].user_id == like.user_id
    end

    test "succeeds to create a chat with Project" do
      project = Factory.insert(:project)

      {:ok, %{chat: chat, chat_group: chat_group, chat_member: chat_member}} =
        Chats.create_chat_group(%{project: project})

      assert chat_group.source_id == project.id
      assert chat_group.source_type == "Project"
      assert chat.name == project.title
      assert chat_member["chat_member:#{project.owner_id}"].user_id == project.owner_id
    end

    test "fails to create a chat with Project" do
      project = Factory.insert(:project)

      Chats.create_chat_group(%{project: project})
      assert {:error, :chat_group, _changeset, %{}} = Chats.create_chat_group(%{project: project})
    end
  end

  describe "add_member/1" do
  end

  describe "remove_member_from_chats/1" do
  end

  describe "create_message/1" do
  end
end
