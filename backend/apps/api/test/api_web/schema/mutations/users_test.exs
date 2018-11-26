defmodule ApiWeb.Schema.Mutations.UsersTest do
  use ApiWeb.ConnCase, async: false

  import Mock

  describe "mutation SignUp" do
    @mutation """
      mutation SignUp($providerId: String!, $uid: String!) {
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

  describe "mutation EditUser" do
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
        skill_ids: ["#{skill1.id}", "#{skill2.id}"]
      }
    end

    @mutation """
      mutation EditUser($displayName: String, $introduction: String, $occupation: String, $occupationTypeId: ID, $genreId: ID, $skillIds: [ID], $companyName: String, $schoolName: String) {
        editUser(userInput: {displayName: $displayName, introduction: $introduction, occupation: $occupation, occupationTypeId: $occupationTypeId, genreId: $genreId, skillIds: $skillIds, companyName: $companyName, schoolName: $schoolName}) {
          id
          displayName
          schoolName
          companyName
          introduction
          occupation
          status
          city {
            id
            fullName
          }
          genre {
            id
            name
          }
          occupationType {
            id
            name
          }
          skills {
            id
            name
          }
          photos {
            id
            imageUrl
            rank
          }
        }
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
        occupationTypeId: "#{occupation_type_id}",
        genreId: "#{genre_id}",
        skillIds: skill_ids,
        companyName: "company1",
        schoolName: "school1"
      }

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        result = response["data"]["editUser"]

        assert result["displayName"] == "hoge"
        user = Repo.get(Db.Users.User, user_id)
        assert user.display_name == "hoge"

        assert Enum.map(Repo.all(Db.Skills.UserSkill, user_id: user_id), &"#{&1.skill_id}") ==
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
  @mutation """
    mutation UploadUserPhoto($photo: Upload!, $isMain: Boolean!, $rank: Int!) {
      uploadUserPhoto(user_uload_input: {photo: $photo, isMain: $isMain, rank: $rank})
    }
  """
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

  describe "mutation DeleteUserPhoto" do
    setup do
      user = Factory.insert(:user)

      {
        :ok,
        user: user
      }
    end

    @mutation """
      mutation DeleteUserPhoto($photoId: ID!) {
        deleteUserPhoto(photoId: $photoId) {
          id
          userId
        }
      }
    """

    test "deletes user main photo", %{user: user} do
      main_photo = Factory.insert(:user_photo, user: user, rank: 0)
      other_photo = Factory.insert(:user_photo, user: user, rank: 1)
      attrs = %{photoId: "#{main_photo.id}"}
      user_id = user.id

      with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        assert response["data"]["deleteUserPhoto"] == %{
                 "id" => "#{main_photo.id}",
                 "userId" => "#{user.id}"
               }

        promoted_photo = Repo.get(Db.Users.Photo, other_photo.id)

        assert promoted_photo.rank == main_photo.rank

        main_photo = Repo.get(Db.Users.Photo, main_photo.id)
        assert is_nil(main_photo)
      end
    end

    # test "deletes user photo", %{user: user} do
    #   photo = Factory.insert(:user_photo, user: user, rank: 1)
    #   other_photo = Factory.insert(:user_photo, user: user, rank: 2)
    #   attrs = %{photoId: photo.id}
    #   user_id = user.id

    #   with_mock Api.Accounts.Authentication, verify: fn user_id -> {:ok, user} end do
    #     conn =
    #       build_conn()
    #       |> put_req_header("authorization", "Bearer #{user_id}")
    #       |> post("/api", %{query: @mutation, variables: attrs})

    #     response = json_response(conn, 200)
    #     assert response["data"]["deleteUserPhoto"] == true

    #     promoted_photo = Repo.get(Db.Users.Photo, other_photo.id)
    #     assert promoted_photo.rank == photo.rank

    #     photo = Repo.get(Db.Users.Photo, photo.id)
    #     assert is_nil(photo)
    #   end
    # end
  end
end
