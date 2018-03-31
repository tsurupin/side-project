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
      user = Factory.insert(:user)
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
      mutation ($displayName: String, $introduction: String, $occupation: String, $occupationTypeId: Integer, $genreId: Integer, $skillIds: [Integer], $companyName: String, $schoolName: String, latitude: Float, longitude: Float) {
        editUser(displayName: $displayName, introduction: $introduction, occupation: $occupation, occupationTyeId: $occupationTypeId, genreId: $genreId, skillIds: $skillIds, companyName: $companyName, latitude: $latitude, longitude: $longitude) {

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
      attrs = %{displayName: "hoge", introduction: "intro", occupation: "Designer", occupationTypeId: occupation_type_id, genreId: genre_id, skillIds: skillIds, companyName: "company1", schoolName: "school1", latitude: 102.22, longitude: -120.11}
      with_mock(Api.Accounts.Authentication, [verify: fn(user_id) -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end]) do
        conn =
           build_conn()
           |> put_req_header("authorization", "Bearer #{user_id}")
           |> post("/api", %{query: @mutation, variables: attrs})
        response = json_response(conn, 200)

        refute is_nil(response["data"]["editUser"])
      end


    end
  end
end
