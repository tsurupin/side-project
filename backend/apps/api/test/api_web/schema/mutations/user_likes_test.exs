defmodule ApiWeb.Schema.Mutations.UserLikessTest do
  use ApiWeb.ConnCase, async: false

  import Mock

  describe "user_like" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user: user
      }
    end

    @mutation """
      mutation ($targetUserId: Int!) {
        likeUser(targetUserId: $targetUserId)
      }
    """
    test "create like", %{user: user} do
      user_id = user.id
      target_user = Factory.insert(:user)

      attrs = %{targetUserId: target_user.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        assert response["data"]["likeUser"]

        like =
          Repo.get_by(
            Db.Users.UserLike,
            user_id: user_id,
            target_user_id: target_user.id,
            status: :requested
          )

        assert like
      end
    end

    test "fail to create like because the like exists", %{user: user} do
      user_id = user.id
      target_user = Factory.insert(:user)
      existing_like = Factory.insert(:user_like, target_user: target_user, user: user)

      attrs = %{targetUserId: target_user.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
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

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)

        assert message == "target_user: does not exist"
      end
    end
  end

  describe "withdraw_user_like" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user: user
      }
    end

    @mutation """
      mutation ($targetUserId: Int!) {
        withdrawUserLike(targetUserId: $targetUserId)
      }
    """
    test "delete like", %{user: user} do
      user_id = user.id
      target_user = Factory.insert(:user)
      like = Factory.insert(:user_like, target_user: target_user, user: user, status: :requested)

      attrs = %{targetUserId: target_user.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        IO.inspect(response)

        assert response["data"]["withdrawUserLike"]
        like = Repo.get(Db.Users.UserLike, like.id)
        assert is_nil(like)
      end
    end

    test "fail to delete like because like is rejected", %{user: user} do
      user_id = user.id
      target_user = Factory.insert(:user)
      like = Factory.insert(:user_like, target_user: target_user, user: user, status: :rejected)

      attrs = %{targetUserId: target_user.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)
        assert message == "bad_request"
      end
    end

    test "fail to delete like because like is not found", %{user: user} do
      user_id = user.id
      target_user = Factory.insert(:user)

      attrs = %{targetUserId: target_user.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)
        assert message == "bad_request"
      end
    end
  end

  describe "accept_user_like" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user: user
      }
    end

    @mutation """
      mutation ($likeId: Int!) {
        acceptUserLike(likeId: $likeId) {
          id
        }
      }
    """

    test "mark like accepted and creates chat group", %{user: user} do
      user_id = user.id
      like = Factory.insert(:user_like, target_user: user, status: :requested)

      attrs = %{likeId: like.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        like = Repo.get(Db.Users.UserLike, like.id)
        assert like.status == :approved
        group = Repo.get_by(Db.Chats.Group, source_id: like.id, source_type: "UserLike")
        assert group
        chat = Repo.get_by(Db.Chats.Chat, chat_group_id: group.id)
        assert chat
        member_ids = Repo.all(Db.Chats.Member, chat_id: chat.id) |> Enum.map(& &1.user_id)
        assert member_ids == [like.user_id, like.target_user_id]
        assert response["data"]["acceptUserLike"]["id"] == "#{chat.id}"
      end
    end

    test "fail to accept like because current_user is not liked user", %{user: user} do
      user_id = user.id
      like = Factory.insert(:user_like)

      attrs = %{likeId: like.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)
        assert message == "bad_request"
      end
    end
  end

  describe "reject_user_like" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user: user
      }
    end

    @mutation """
      mutation ($likeId: Int!) {
        rejectUserLike(likeId: $likeId)
      }
    """
    test "mark like rejected", %{user: user} do
      user_id = user.id
      like = Factory.insert(:user_like, target_user: user)

      attrs = %{likeId: like.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        like = Repo.get(Db.Users.UserLike, like.id)
        assert like.status == :rejected

        assert response["data"]["rejectUserLike"]
      end
    end

    test "fail to reject like because current_user is not liked user", %{user: user} do
      user_id = user.id
      like = Factory.insert(:user_like)

      attrs = %{likeId: like.id}

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        %{"errors" => [%{"message" => message} | _tail]} = json_response(conn, 200)
        assert message == "bad_request"
      end
    end
  end
end
