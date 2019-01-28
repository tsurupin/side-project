defmodule ApiWeb.Schema.Queries.ProjectsTest do
  use ApiWeb.ConnCase, async: false
  import Mock
  alias Db.Uploaders.ProjectPhotoUploader
  alias Db.Uploaders.UserPhotoUploader

  describe "query Project" do
    setup do
      occupation_type = Factory.insert(:occupation_type)

      owner = Factory.insert(:user, occupation_type: occupation_type)
      user_photo = Factory.insert(:user_photo, user: owner, rank: 0)

      genre = Factory.insert(:genre)

      san_francisco =
        Factory.insert(
          :city,
          name: "San Francisco",
          state_name: "California",
          state_abbreviation: "CA"
        )

      project =
        Factory.insert(:project, genre: genre, city: san_francisco, owner: owner, status: 1)

      skill = Factory.insert(:skill)
      member = Factory.insert(:project_member, project: project, user: owner)

      Factory.insert(:project_skill, project: project, skill: skill)
      photo = Factory.insert(:project_photo, project: project)

      {
        :ok,
        project: project,
        skill: skill,
        owner: owner,
        genre: genre,
        city: san_francisco,
        user: owner,
        user_photo_url: UserPhotoUploader.url({user_photo.image_url, user_photo}, :thumb),
        occupation_type: occupation_type,
        photo_url: ProjectPhotoUploader.url({photo.image_url, photo}, :thumb)
      }
    end

    @query """
      query Project($id: ID!) {
        project(id: $id) {
          id
          title
          leadSentence
          status
          motivation
          requirement
          owner {
            id
            displayName
          }
          genre {
            id
            name
          }
          skills {
            id
            name
          }
          city {
            id
            fullName
          }
          users {
            id
            displayName
            mainPhotoUrl
            occupationType {
              id
              name
            }
          }
          photos {
            imageUrl
          }
        }
      }
    """
    test "returns projects", cxt do
      %{
        project: project,
        skill: skill,
        genre: genre,
        owner: owner,
        city: city,
        user: user,
        user_photo_url: user_photo_url,
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
            variables: %{id: project.id}
          })

        response = json_response(conn, 200)

        expected_result = %{
          "project" => %{
            "id" => "#{project.id}",
            "title" => project.title,
            "leadSentence" => project.lead_sentence,
            "motivation" => project.motivation,
            "requirement" => project.requirement,
            "status" => "COMPLETED",
            "skills" => [%{"id" => "#{skill.id}", "name" => skill.name}],
            "genre" => %{"id" => "#{genre.id}", "name" => genre.name},
            "owner" => %{"id" => "#{owner.id}", "displayName" => owner.display_name},
            "city" => %{
              "id" => "#{city.id}",
              "fullName" => "#{city.name}, #{city.state_abbreviation}"
            },
            "users" => [
              %{
                "id" => "#{user.id}",
                "displayName" => user.display_name,
                "mainPhotoUrl" => user_photo_url,
                "occupationType" => %{
                  "id" => "#{occupation_type.id}",
                  "name" => occupation_type.name
                }
              }
            ],
            "photos" => [%{"imageUrl" => photo_url}]
          }
        }

        assert response["data"] == expected_result
      end
    end
  end

  describe "query Projects" do
    setup do
      user = Factory.insert(:user)
      genre1 = Factory.insert(:genre)
      genre2 = Factory.insert(:genre)
      project1 = Factory.insert(:project, genre: genre2, status: 1)
      project2 = Factory.insert(:project, genre: genre2, status: 1)
      project3 = Factory.insert(:project, genre: genre1, status: 1)
      project4 = Factory.insert(:project, genre: genre2, status: 0)
      skill1 = Factory.insert(:skill)
      skill2 = Factory.insert(:skill)
      Factory.insert(:project_skill, project: project1, skill: skill1)
      Factory.insert(:project_skill, project: project2, skill: skill2)
      Factory.insert(:project_skill, project: project3, skill: skill1)
      photo = Factory.insert(:project_photo, project: project1, rank: 0)

      {
        :ok,
        user_id: user.id,
        project1: project1,
        project2: project2,
        skill1: skill1,
        skill2: skill2,
        genre1: genre1,
        genre2: genre2,
        photo1_url: ProjectPhotoUploader.url({photo.image_url, photo}, :thumb)
      }
    end

    @query """
      query Projects($genreId: ID, $cityId: ID, $skillIds: [ID]) {
        projects(conditions: {genreId: $genreId, cityID: $cityId, skillIds: $skillIds}) {
          id
          title
          leadSentence
          mainPhotoUrl
          genre {
            id
            name
          }
        }
      }
    """
    test "returns projects", cxt do
      %{
        user_id: user_id,
        project1: project1,
        project2: project2,
        skill1: skill1,
        skill2: skill2,
        genre1: genre1,
        genre2: genre2,
        photo1_url: photo1_url
      } = cxt

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> get("/api", %{
            query: @query,
            variables: %{genreId: genre2.id, skillIds: [skill1.id, skill2.id]}
          })

        response = json_response(conn, 200)

        expected_result = %{
          "projects" => [
            %{
              "id" => "#{project1.id}",
              "title" => project1.title,
              "leadSentence" => project1.lead_sentence,
              "genre" => %{"id" => "#{genre2.id}", "name" => genre2.name},
              "mainPhotoUrl" => photo1_url
            },
            %{
              "id" => "#{project2.id}",
              "title" => project2.title,
              "leadSentence" => project2.lead_sentence,
              "genre" => %{"id" => "#{genre2.id}", "name" => genre2.name},
              "mainPhotoUrl" => nil
            }
          ]
        }

        assert response["data"] == expected_result
      end
    end
  end

  describe "query MyProjects" do
    setup do
      user = Factory.insert(:user)
      genre1 = Factory.insert(:genre)
      genre2 = Factory.insert(:genre)
      project1 = Factory.insert(:project, genre: genre2, status: 1)
      project2 = Factory.insert(:project, genre: genre2, status: 1)
      project3 = Factory.insert(:project, genre: genre1, status: 1)
      project4 = Factory.insert(:project, genre: genre2, status: 0)
      Factory.insert(:project_like, project: project1, user: user)
      Factory.insert(:project_like, project: project2, user: user)
      photo = Factory.insert(:project_photo, project: project1, rank: 0)

      {
        :ok,
        user_id: user.id,
        project1: project1,
        project2: project2,
        genre1: genre1,
        genre2: genre2,
        photo1_url: ProjectPhotoUploader.url({photo.image_url, photo}, :thumb)
      }
    end

    @query """
      query MyProjects {
        myProjects {
          id
          title
          leadSentence
          mainPhotoUrl
          genre {
            id
            name
          }
        }
      }
    """
    test "returns my projects", cxt do
      %{
        user_id: user_id,
        project1: project1,
        project2: project2,
        genre1: genre1,
        genre2: genre2,
        photo1_url: photo1_url
      } = cxt

      with_mock Api.Accounts.Authentication,
        verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
        conn =
          build_conn()
          |> put_req_header("authorization", "Bearer #{user_id}")
          |> get("/api", %{
            query: @query
          })

        response = json_response(conn, 200)

        expected_result = %{
          "myProjects" => [
            %{
              "id" => "#{project1.id}",
              "title" => project1.title,
              "leadSentence" => project1.lead_sentence,
              "genre" => %{"id" => "#{genre2.id}", "name" => genre2.name},
              "mainPhotoUrl" => photo1_url
            },
            %{
              "id" => "#{project2.id}",
              "title" => project2.title,
              "leadSentence" => project2.lead_sentence,
              "genre" => %{"id" => "#{genre2.id}", "name" => genre2.name},
              "mainPhotoUrl" => nil
            }
          ]
        }

        assert response["data"] == expected_result
      end
    end
  end
end
