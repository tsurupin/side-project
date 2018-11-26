defmodule ApiWeb.Schema.Mutations.CitiesTest do
  use ApiWeb.ConnCase, async: false

  import Mock

  describe "mutation FindOrCreateCity" do
    setup do
      user = Factory.insert(:user)
      country = Factory.insert(:country)

      {
        :ok,
        user_id: user.id, country: country
      }
    end

    @mutation """
      mutation FindOrCreateCity(
        $name: String!,
        $stateName: String!,
        $stateAbbreviation: String!,
        $countryName: String!
      ) {
      findOrCreateCity(
        cityInput: {
          name: $name,
          stateName: $stateName,
          stateAbbreviation: $stateAbbreviation,
          countryName: $countryName
        }
      ) {
        id
        fullName
      }
    }
    """
    test "succeeds to find an existing city", %{user_id: user_id, country: country} do
      city = Factory.insert(:city, country: country, state_abbreviation: "CA")

      attrs = %{
        name: city.name,
        stateName: city.state_name,
        stateAbbreviation: city.state_abbreviation,
        countryName: country.name
      }

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        assert response["data"]["findOrCreateCity"]["id"] == "#{city.id}"
      end
    end

    test "succeeds to create a new city", %{user_id: user_id, country: country} do
      attrs = %{
        name: "Shibuya",
        stateName: "Tokyo",
        stateAbbreviation: "Tokyo",
        countryName: country.name
      }

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)

        assert response["data"]["findOrCreateCity"]["id"]
        assert Repo.get(Db.Locations.City, response["data"]["findOrCreateCity"]["id"])
        assert response["data"]["findOrCreateCity"]["fullName"] == "Shibuya, Tokyo"
      end
    end

    test "returns error because of unfound country name", %{user_id: user_id} do
      attrs = %{
        name: "Shibuya",
        stateName: "Tokyo",
        stateAbbreviation: "Tokyo",
        countryName: "unknowon country"
      }

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> post("/api", %{query: @mutation, variables: attrs})

        response = json_response(conn, 200)
        result = response["data"]["findOrCreateCity"]
        IO.inspect(result)
      end
    end
  end
end
