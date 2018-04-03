defmodule ApiWeb.Schema.Mutations.LikessTest do
  use ApiWeb.ConnCase, async: true

  import Mock

  describe "like" do
    setup do
      user = Factory.insert(:user)
      {
        :ok,
        user: user
      }
    end
    @mutation """
      mutation ($targetUserId: Int!) {
        like(targetUserId: $targetUserId)
      }
    """
    test "create like", %{user: user} do
      user_id = user.id
      target_user = Factory.insert(:user)

      attrs = %{targetUserId: target_user.id}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})
        response = json_response(conn, 200)

        assert response["data"]["like"]
        like = Repo.get_by(Db.Users.Like, user_id: user_id, target_user_id: target_user.id, status: :requested)
        assert like
      end
    end

    test "fail to create like because the like exists", %{user: user} do

      user_id = user.id
      target_user = Factory.insert(:user)
      existing_like = Factory.insert(:user_like, target_user: target_user, user: user)

      attrs = %{targetUserId: target_user.id}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message == "user_id: has already been taken"
      end
    end

    test "fail to create like because the target_user doesn't exist", %{user: user} do

      user_id = user.id

      attrs = %{targetUserId: 10}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message == "target_user: does not exist"
      end

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
