defmodule Db.Users.AccountsTest do
  use Db.DataCase
  alias Db.Users.Accounts

  describe "get_or_create_user/1" do
    test "returns existing user" do
      existing_user = Factory.insert(:user)

      assert {:ok, user} =
               Accounts.get_or_create_user(%{
                 provider_id: existing_user.provider_id,
                 uid: existing_user.uid
               })

      assert existing_user.id == user.id
    end

    test "succeeds to creates a new user" do
      assert {:ok, user} = Accounts.get_or_create_user(%{provider_id: "facebook", uid: "uid"})
    end
  end
end
