defmodule ApiWeb.Schema.Queries.CitiesTest do
  use ApiWeb.ConnCase, async: false

  import Mock

  describe "query CityList" do
    setup do
      IO.inspect(Db.Repo.all(Db.Locations.ZipCode))
      san_francisco = Factory.insert(:city, name: "San Francisco", state_name: "California")
      Factory.insert(:zip_code, zip_code: "94103", city_id: san_francisco.id)


      new_york =
        Factory.insert(
          :city,
          name: "New York",
          state_name: "New York",
          state_abbreviation: "NY"
        )

      Factory.insert(:zip_code, zip_code: "941001", city_id: new_york.id)

      {:ok, san_francisco: san_francisco, new_york: new_york}
    end

    @query """
      query CityList($name: String) {
        cityList(name: $name) {
         ... on City {
            id
            fullName
          }
        }
      }
    """

    test "returns cities with name", %{san_francisco: san_francisco} do
      user = Factory.insert(:user, display_name: "test")

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user.id}")
          |> get("/api", %{query: @query, variables: %{name: "San"}})

        response = json_response(conn, 200)

        expected_result = %{
          "cityList" => [
            %{"id" => "#{san_francisco.id}", "fullName" => "San Francisco, California"}
          ]
        }

        assert response["data"] == expected_result
      end
    end

    test "returns empty array", _ do
      user = Factory.insert(:user, display_name: "test")

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user.id}")
          |> get("/api", %{query: @query, variables: %{name: "test"}})

        response = json_response(conn, 200)
        expected_result = %{"cityList" => []}

        assert response["data"] == expected_result
      end
    end

    # test "return cities with zip_code", %{new_york: new_york} do
    #   user = Factory.insert(:user, display_name: "test")

    #   with_mock Api.Accounts.Authentication,
    #     verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
    #     conn =
    #       build_conn()
    #       |> put_req_header("authorization", "Bearer #{user.id}")
    #       |> get("/api", %{query: @query, variables: %{zipCode: "941001"}})

    #     response = json_response(conn, 200)

    #     expected_result = %{
    #       "cityList" => [%{"id" => "#{new_york.id}", "fullName" => "New York, NY"}]
    #     }

    #     assert response["data"] == expected_result
    #   end
    # end
  end
end
