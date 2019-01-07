defmodule ApiWeb.Schema.Queries.UsersTest do
  use ApiWeb.ConnCase, async: false
  import Mock
  alias Db.Uploaders.UserPhotoUploader

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

    current_user =
      Factory.insert(:user, genre: genre, city: san_francisco, occupation_type: occupation_type)

    user =
      Factory.insert(:user, genre: genre, city: san_francisco, occupation_type: occupation_type)

    skill = Factory.insert(:skill)
    Factory.insert(:user_skill, user: user, skill: skill)
    photo = Factory.insert(:user_photo, user: user, rank: 0)

    {
      :ok,
      current_user: current_user,
      user: user,
      skill: skill,
      city: san_francisco,
      genre: genre,
      occupation_type: occupation_type,
      photo_url: UserPhotoUploader.url({photo.image_url, photo}, :thumb)
    }
  end

  describe "query User" do
    @query """
      query User($id: ID!) {
        user(id: $id) {
          id
          displayName
          schoolName
          companyName
          introduction
          status
          hasLiked
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
    test "when current_user has not liked user, returns user with hasLiked false", cxt do
      %{
        current_user: current_user,
        user: user,
        skill: skill,
        genre: genre,
        city: city,
        occupation_type: occupation_type,
        photo_url: photo_url
      } = cxt

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, current_user.id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{current_user.id}")
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
            "hasLiked" => false,
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
    test "when current_user alreadh liked the user, returns user with hasLiked true", cxt do
      %{
        current_user: current_user,
        user: user,
        skill: skill,
        genre: genre,
        city: city,
        occupation_type: occupation_type,
        photo_url: photo_url
      } = cxt

      Factory.insert(:user_like, user: current_user, target_user: user)

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, current_user.id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{current_user.id}")
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
            "hasLiked" => true,
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


  end

  describe "query Users" do
    @query """
      query Users($occupationTypeId: ID, $genreId: ID, $distance: Int, $latitude: Float, $longitude: Float, $isActive: Boolean, $skillIds: [ID]) {
        users(conditions: {occupationTypeId: $occupationTypeId, genreId: $genreId, location: {distance: $distance, latitude: $latitude, longitude: $longitude}, isActive: $isActive, skillIds: $skillIds }) {
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
    test "returns users", cxt do
      %{
        current_user: current_user,
        user: user,
        occupation_type: occupation_type,
        city: city,
        genre: genre,
        photo_url: photo_url
      } = cxt

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, current_user.id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{current_user.id}")
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
  end

  describe "query MyUsers" do
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

    test "returns users", cxt do
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
