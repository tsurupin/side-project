defmodule ApiWeb.Schema.Mutations.UsersTest do
  use ApiWeb.ConnCase, async: true

  import Mock

  describe "signup" do
    @mutation """
      mutation ($providerId: String!, $uid: String!) {
        signUp(providerId: $providerId, uid: $uid) {
          token
        }
      }
    """
    test "creates a new user" do
      attrs = %{providerId: "facebook", uid: "1"}
      conn = build_conn()
      conn = post(conn, "/api", %{query: @mutation, variables: attrs})
      response = json_response(conn, 200)

      refute is_nil(response["data"]["signUp"]["token"])
    end
  end

  describe "edit user info" do
    setup do
      user = Factory.insert(:user, display_name: "test")
      genre = Factory.insert(:genre)
      occupation_type = Factory.insert(:occupation_type)
      skill1 = Factory.insert(:skill)
      skill2 = Factory.insert(:skill)

      {
        :ok,
        user_id: user.id,
        genre_id: genre.id,
        occupation_type_id: occupation_type.id,
        skill_ids: [skill1.id, skill2.id]
      }
    end

    @mutation """
      mutation ($displayName: String, $introduction: String, $occupation: String, $occupationTypeId: Int, $genreId: Int, $skillIds: [Int], $companyName: String, $schoolName: String, $latitude: Float, $longitude: Float) {
        editUser(userInput: {displayName: $displayName, introduction: $introduction, occupation: $occupation, occupationTypeId: $occupationTypeId, genreId: $genreId, skillIds: $skillIds, companyName: $companyName, schoolName: $schoolName, latitude: $latitude, longitude: $longitude})
      }
    """

    test "edits user info", cxt do
      %{
        user_id: user_id,
        genre_id: genre_id,
        occupation_type_id: occupation_type_id,
        skill_ids: skill_ids
      } = cxt

      attrs = %{
        displayName: "hoge",
        introduction: "intro",
        occupation: "Designer",
        occupationTypeId: occupation_type_id,
        genreId: genre_id,
        skillIds: skill_ids,
        companyName: "company1",
        schoolName: "school1",
        latitude: 102.22,
        longitude: -120.11
      }

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        assert response["data"]["editUser"] == true
        user = Repo.get(Db.Users.User, user_id)
        assert user.display_name == "hoge"

        assert Enum.map(Repo.all(Db.Skills.UserSkill, user_id: user_id), & &1.skill_id) ==
                 skill_ids
      end
    end
  end

  # # TODO: Figure out how to test upload photo
  # describe "upload user photo" do
  #   setup do
  #     user = Factory.insert(:user)
  #     photo = Factory.insert(:user_photo)
  #     {
  #       :ok,
  #       user_id: user.id,
  #       photo: photo
  #     }
  #   end
  #
  #   @mutation """
  #     mutation ($photo: Upload!, $isMain: Boolean!, $rank: Int!) {
  #       uploadUserPhoto(user_uload_input: {photo: $photo, isMain: $isMain, rank: $rank})
  #     }
  #   """
  #   test "uploads user photo", %{user_id: user_id, photo: photo} do
  #     attrs = %{userUploadInput: %{isMain: true, photo: photo.image_url, rank: 1}}
  #     IO.inspect(attrs)
  #     with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
  #       conn =
  #         build_conn()
  #         |> put_req_header("content-type", "multipart/form-data")
  #         |> put_req_header("authorization", "Bearer #{user_id}")
  #         |> post("/api", %{query: @mutation, variables: attrs})
  #       response = json_response(conn, 200)
  #
  #       assert response["data"]["uploadUserPhoto"] == true
  #       photo = Repo.get(Db.Users.Photo, user_id)
  #       refute is_nil(photo)
  #       assert photo.is_main
  #     end
  #   end
  # end

  describe "delete user photo" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user: user
      }
    end

    @mutation """
      mutation ($photoId: Int!) {
        deleteUserPhoto(photoId: $photoId)
      }
    """

    test "deletes user main photo", %{user: user} do
      main_photo = Factory.insert(:user_photo, user: user, is_main: true, rank: 0)
      other_photo = Factory.insert(:user_photo, user: user, is_main: false, rank: 2)
      attrs = %{photoId: main_photo.id}
      user_id = user.id

      with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        assert response["data"]["deleteUserPhoto"] == true

        promoted_photo = Repo.get(Db.Users.Photo, other_photo.id)

        assert promoted_photo.rank == main_photo.rank
        assert promoted_photo.is_main

        main_photo = Repo.get(Db.Users.Photo, main_photo.id)
        assert is_nil(main_photo)
      end
    end

    test "deletes user photo", %{user: user} do
      photo = Factory.insert(:user_photo, user: user, is_main: false, rank: 1)
      other_photo = Factory.insert(:user_photo, user: user, is_main: false, rank: 2)
      attrs = %{photoId: photo.id}
      user_id = user.id

      with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        assert response["data"]["deleteUserPhoto"] == true

        promoted_photo = Repo.get(Db.Users.Photo, other_photo.id)
        assert promoted_photo.rank == photo.rank

        photo = Repo.get(Db.Users.Photo, photo.id)
        assert is_nil(photo)
      end
    end
  end
end
