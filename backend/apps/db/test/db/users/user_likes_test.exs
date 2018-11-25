defmodule Db.UserLikesTest do
  use Db.DataCase
  alias Db.Users.{UserLikes, UserLike}
  alias Db.Repo

  describe "like/1" do
    test "succeeds to like a target user" do
      user = Factory.insert(:user)
      target_user = Factory.insert(:user)
      assert {:ok, true} = UserLikes.like(%{target_user_id: target_user.id, user_id: user.id})
    end

    test "fails to like a target user because user is already liked by the target user" do
      user = Factory.insert(:user)
      target_user = Factory.insert(:user)

      alread_liked = Factory.insert(:user_like, user: target_user, target_user: user)

      assert {:error, "user_id: user is already liked by target_user"} =
               UserLikes.like(%{target_user_id: target_user.id, user_id: user.id})
    end
  end

  describe "withdraw_like/1" do
    test "returns :bad_request when project_like is not found" do
      user = Factory.insert(:user)
      target_user = Factory.insert(:user)

      assert {:error, :bad_request} =
               UserLikes.withdraw_like(%{target_user_id: target_user.id, user_id: user.id})
    end

    test "succeeds to delete user_like" do
      user = Factory.insert(:user)
      target_user = Factory.insert(:user)

      user_like =
        Factory.insert(:user_like, user: user, target_user: target_user, status: :requested)

      assert {:ok, true} =
               UserLikes.withdraw_like(%{target_user_id: target_user.id, user_id: user.id})

      refute Repo.get(UserLike, user_like.id)
    end
  end

  describe "accept_like/2" do
    test "succeeds to accept like and create private chat" do
      user = Factory.insert(:user)
      target_user = Factory.insert(:user)

      user_like =
        Factory.insert(:user_like, user: user, target_user: target_user, status: :requested)

      assert {:ok, chat} = UserLikes.accept_like(target_user, %{user_id: user.id})
      assert Repo.get_by(UserLike, id: user_like.id, status: :approved)
      assert Repo.get_by(Db.Chats.Group, source_id: user_like.id, source_type: "UserLike")
    end

    test "returns :bad_request when user_like is not found" do
      user = Factory.insert(:user)
      target_user = Factory.insert(:user)

      assert {:error, :bad_request} = UserLikes.accept_like(target_user, %{user_id: user.id})
    end
  end

  describe "reject_like/2" do
    test "returns :bad_request when requested user_like is not found" do
      user = Factory.insert(:user)
      target_user = Factory.insert(:user)

      user_like =
        Factory.insert(:user_like, user: user, target_user: target_user, status: :requested)

      assert {:ok, true} = UserLikes.reject_like(target_user, %{user_id: user.id})
    end

    test "succeeds to reject like" do
      user = Factory.insert(:user)
      target_user = Factory.insert(:user)

      assert {:error, :bad_request} = UserLikes.reject_like(target_user, %{user_id: user.id})
    end
  end
end
