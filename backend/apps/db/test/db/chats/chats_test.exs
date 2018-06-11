defmodule Db.ChatsTest do
  use Db.DataCase

  describe "get_by/1" do
    alias Chats.Chats

    test "returns chat with id" do
      temp_chat = Factory.insert(:chat)
      {:ok, chat} = Chats.get_by(%{id: temp_chat.id})
      assert temp_chat.id === chat.id
    end

    test "returns not_foudn error" do
      assert Chats.get_by(%{id: 1}) == {:error, :not_found}
    end
  end

  describe "create_chat_group/1" do
  end

  describe "bulkd_create_members/3" do
  end

  describe "add_member/1" do
  end

  describe "remove_member_from_chats/1" do
  end

  describe "create_message/1" do
  end

  describe "with_messages/1" do
  end

  describe "attended_chats/1" do
  end

  describe "main_chat/1" do
  end

  describe "preload/2" do
  end
end
