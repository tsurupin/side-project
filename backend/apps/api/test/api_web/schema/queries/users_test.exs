defmodule ApiWeb.Schema.Queries.UsersTest do
  use ApiWeb.ConnCase, async: true

  describe "users query" do
    setup do
      occupation_type = Factory.insert(:occupation_type)
      country = Factory.insert(:country)
      genre = Factory.insert(:genre)
      user = Factory.insert(:user, genre: genre, country: country, occupation_type: occupation_type)
      skill = Factory.insert(:skill)
      user_skill = Factory.insert(:user_skill, user: user, skill: skill)
      user_photo = Factory.insert(:user_photo, user: user)


      {
        :ok,
        user: user,
        skill: skill,
        country: country,
        genre: genre,
        occupation_type: occupation_type
      }
    end

    @query """
      query($id: ID!) {
        user(id: $id) {
          id
          displayName
          schoolName
          status
          areaName
          genre {
            id
            name
          }
          occupationType {
            id
            name
          }
          country {
            id
            name
          }
          skills {
            id
            name
          }
        }
      }

    """
    test "user fields return user", cxt do
      %{user: user, skill: skill, genre: genre, country: country, occupation_type: occupation_type} = cxt
      conn = build_conn()
      conn = get(conn, "/api", %{query: @query, variables: %{id: user.id}})
      response = json_response(conn, 200)

      expected_result = %{
        "user" => %{
          "id" => "#{user.id}",
          "displayName" => user.display_name,
          "areaName" => user.area_name,
          "schoolName" => user.school_name,
          "status" => "COMPLETED",
          "skills" => [%{"id" => "#{skill.id}", "name" => skill.name}],
          "country" => %{"id" => "#{country.id}", "name" => country.name},
          "genre" => %{"id" => "#{genre.id}", "name" => genre.name},
          "occupationType" => %{"id" => "#{occupation_type.id}", "name" => occupation_type.name},

        }
      }
      assert response["data"] == expected_result
    end
  end

end
