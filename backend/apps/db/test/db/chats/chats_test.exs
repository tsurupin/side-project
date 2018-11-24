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

    test "fails to create a chat with Project because main chat already exists in the project" do
      project = Factory.insert(:project)

      Chats.create_chat_group(%{project: project})
      assert {:error, :chat_group, _changeset, %{}} = Chats.create_chat_group(%{project: project})
    end
  end

  describe "add_member/1" do
    test "succeeds to add a member" do
      chat = Factory.insert(:chat)
      user = Factory.insert(:user)
      {:ok, chat_member} = Chats.add_member(%{chat_id: chat.id, user_id: user.id})
      assert chat_member.user_id == user.id
      assert chat_member.chat_id == chat.id
    end

    test "succeds to revive a member" do
      chat = Factory.insert(:chat)
      user = Factory.insert(:user)
      deleted_chat_member = Factory.insert(:chat_member, chat: chat, user: user, deleted_at: Timex.now)

      {:ok, chat_member} = Chats.add_member(%{chat_id: chat.id, user_id: user.id})
      assert chat_member.id == deleted_chat_member.id
      assert is_nil(chat_member.deleted_at)
    end

    test "fails to add a member because already member exists in the chat" do
      chat = Factory.insert(:chat)
      user = Factory.insert(:user)
      existing_chat_member = Factory.insert(:chat_member, chat: chat, user: user)

      assert {:error, changeset} = Chats.add_member(%{chat_id: chat.id, user_id: user.id})
    end
  end

  describe "remove_member_from_chats/1" do
    test "succeeds to remove a member" do
      project = Factory.insert(:project)
      user = Factory.insert(:user)
      chat_group = Factory.insert(:chat_group, source_id: project.id, source_type: "Project")
      chat1 = Factory.insert(:chat, chat_group: chat_group)
      chat2 = Factory.insert(:chat, chat_group: chat_group)
      chat1_member = Factory.insert(:chat_member, chat: chat1, user: user)
      chat2_member = Factory.insert(:chat_member, chat: chat2, user: user)


      {:ok, changeset } = Chats.remove_member_from_chats(%{project_id: project.id, user_id: user.id})
      assert changeset["remove_member:#{chat1_member.id}"].id == chat1_member.id
      assert changeset["remove_member:#{chat2_member.id}"].id == chat2_member.id
    end
  end

  describe "create_message/1" do
    test "succeeds to create a message" do
      chat = Factory.insert(:chat)
      user = Factory.insert(:user)
      chat_member = Factory.insert(:chat_member, chat: chat, user: user)
      assert {:ok, message} = Chats.create_message(%{chat_id: chat.id, user_id: user.id, message_type: "comment", comment: "test"})
    end

    test "fails to create a message because of blank content" do
      chat = Factory.insert(:chat)
      user = Factory.insert(:user)
      assert {:error, _error_message} = Chats.create_message(%{chat_id: chat.id, user_id: user.id})
    end
  end
end
