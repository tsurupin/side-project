defmodule ApiWeb.Schema.Queries.UsersTest do
  use ApiWeb.ConnCase, async: false
  import Mock
  alias Db.Uploaders.UserPhotoUploader

  describe "users query" do
    setup do
      occupation_type = Factory.insert(:occupation_type)

      san_francisco =
        Factory.insert(
          :city,
          name: "San Francisco",
          state_name: "California",
          state_abbreviation: "CA"
        )

      genre = Factory.insert(:genre)

      user =
        Factory.insert(:user, genre: genre, city: san_francisco, occupation_type: occupation_type)

      skill = Factory.insert(:skill)
      Factory.insert(:user_skill, user: user, skill: skill)
      photo = Factory.insert(:user_photo, user: user, rank: 0)

      {
        :ok,
        user: user,
        skill: skill,
        city: san_francisco,
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
          companyName
          introduction
          status
          genre {
            id
            name
          }
          occupationType {
            id
            name
          }
          city {
            id
            fullName
          }
          skills {
            id
            name
          }
          photos {
            imageUrl
          }
        }
      }

    """
    test "user fields return user", cxt do
      %{
        user: user,
        skill: skill,
        genre: genre,
        city: city,
        occupation_type: occupation_type,
        photo_url: photo_url
      } = cxt

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user.id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user.id}")
          |> get("/api", %{
            query: @query,
            variables: %{id: user.id}
          })

        response = json_response(conn, 200)

        expected_result = %{
          "user" => %{
            "id" => "#{user.id}",
            "displayName" => user.display_name,
            "schoolName" => user.school_name,
            "companyName" => user.company_name,
            "introduction" => user.introduction,
            "status" => "COMPLETED",
            "skills" => [%{"id" => "#{skill.id}", "name" => skill.name}],
            "city" => %{
              "id" => "#{city.id}",
              "fullName" => "#{city.name}, #{city.state_abbreviation}"
            },
            "genre" => %{"id" => "#{genre.id}", "name" => genre.name},
            "occupationType" => %{"id" => "#{occupation_type.id}", "name" => occupation_type.name},
            "photos" => [%{"imageUrl" => photo_url}]
          }
        }

        assert response["data"] == expected_result
      end
    end

    @query """
      query users($occupationTypeId: Int, $genreId: Int, $distance: Int, $isActive: Boolean, $skillIds: [Int]) {
        users(conditions: {occupationTypeId: $occupationTypeId, genreId: $genreId, distance: $distance, isActive: $isActive, skillIds: $skillIds }) {
          id
          displayName
          schoolName
          companyName
          introduction
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
          mainPhotoUrl
        }
      }
    """
    test "users queries return users", cxt do
      %{
        user: user,
        occupation_type: occupation_type,
        city: city,
        genre: genre,
        photo_url: photo_url
      } = cxt

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user.id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user.id}")
          |> get("/api", %{
            query: @query,
            variables: %{occupationTypeId: occupation_type.id, genreId: genre.id}
          })

        response = json_response(conn, 200)

        expected_result = %{
          "users" => [
            %{
              "id" => "#{user.id}",
              "displayName" => user.display_name,
              "occupationType" => %{
                "id" => "#{occupation_type.id}",
                "name" => occupation_type.name
              },
              "genre" => %{"id" => "#{genre.id}", "name" => genre.name},
              "city" => %{
                "id" => "#{city.id}",
                "fullName" => "#{city.name}, #{city.state_abbreviation}"
              },
              "introduction" => user.introduction,
              "schoolName" => user.school_name,
              "companyName" => user.company_name,
              "mainPhotoUrl" => photo_url
            }
          ]
        }

        assert response["data"] == expected_result
      end
    end

    @query """
      query MyUser {
        myUser {
          id
          displayName
          schoolName
          companyName
          introduction
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
          mainPhotoUrl
        }
      }
    """

    test "myUser queries return users", cxt do
      %{
        user: user,
        occupation_type: occupation_type,
        city: city,
        genre: genre,
        photo_url: photo_url
      } = cxt

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user.id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user.id}")
          |> get("/api", %{
            query: @query
          })

        response = json_response(conn, 200)

        expected_result = %{
          "myUser" => %{
            "id" => "#{user.id}",
            "displayName" => user.display_name,
            "occupationType" => %{
              "id" => "#{occupation_type.id}",
              "name" => occupation_type.name
            },
            "genre" => %{"id" => "#{genre.id}", "name" => genre.name},
            "city" => %{
              "id" => "#{city.id}",
              "fullName" => "#{city.name}, #{city.state_abbreviation}"
            },
            "introduction" => user.introduction,
            "schoolName" => user.school_name,
            "companyName" => user.company_name,
            "mainPhotoUrl" => photo_url
          }
        }

        assert response["data"] == expected_result
      end
    end
  end
end
