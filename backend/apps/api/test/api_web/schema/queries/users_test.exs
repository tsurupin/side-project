defmodule ApiWeb.Schema.Queries.UsersTest do
  use ApiWeb.ConnCase, async: true
  alias Db.Uploaders.UserPhotoUploader
  describe "users query" do
    setup do
      occupation_type = Factory.insert(:occupation_type)
      country = Factory.insert(:country)
      genre = Factory.insert(:genre)
      user = Factory.insert(:user, genre: genre, country: country, occupation_type: occupation_type)
      skill = Factory.insert(:skill)
      Factory.insert(:user_skill, user: user, skill: skill)
      photo = Factory.insert(:user_photo, user: user)


      {
        :ok,
        user: user,
        skill: skill,
        country: country,
        genre: genre,
        occupation_type: occupation_type,
        photo_url: UserPhotoUploader.url({photo.image_url, photo}, :thumb)
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
          photos {
            image_url
          }
        }
      }

    """
    test "user fields return user", cxt do
      %{user: user, skill: skill, genre: genre, country: country, occupation_type: occupation_type, photo_url: photo_url} = cxt
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
          "photos" => [%{"image_url" => photo_url}]
        }
      }
      assert response["data"] == expected_result
    end
  end

end
