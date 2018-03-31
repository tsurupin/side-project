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
      attrs = %{displayName: "hoge", introduction: "intro", occupation: "Designer", occupationTypeId: occupation_type_id, genreId: genre_id, skillIds: skill_ids, companyName: "company1", schoolName: "school1", latitude: 102.22, longitude: -120.11}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})
        response = json_response(conn, 200)

        assert response["data"]["editUser"] == true
        user = Repo.get(Db.Users.User, user_id)
        assert user.display_name == "hoge"
        # TODO
        # add multi upsert skill_ids
      end


    end
  end
end
