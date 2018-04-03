defmodule ApiWeb.Schema.Mutations.LikessTest do
  use ApiWeb.ConnCase, async: true

  import Mock

  describe "like" do
    test "create like" do

    end

    test "fail to create like because the like exists" do
    end
  end

  describe "withdraw_like" do
    test "delete like" do

    end

    test "fail to delete like because like is rejected" do

    end

    test "fail to delete like because like is not found" do

    end
  end

  describe "accept_like" do

    test "mark like accepted and creates chat group" do

    end

    test "fail to accept like because current_user is not liked user" do

    end
  end

  describe "reject_like" do

    test "mark like rejected" do

    end

    test "fail to reject like because current_user is not liked user" do

    end
  end
end
