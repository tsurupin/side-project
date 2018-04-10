defmodule ApiWeb.Schema.Queries.ProjectsTest do
  use ApiWeb.ConnCase, async: false
  import Mock
  alias Db.Uploaders.ProjectPhotoUploader

  describe "project detail query" do
    setup do
      owner = Factory.insert(:user)
      genre = Factory.insert(:genre)
      project = Factory.insert(:project, genre: genre, owner: owner, status: 1)
      skill = Factory.insert(:skill)
      Factory.insert(:project_skill, project: project, skill: skill)
      photo = Factory.insert(:project_photo, project: project)

      {
        :ok,
        project: project,
        skill: skill,
        owner: owner,
        genre: genre,
        photo_url: ProjectPhotoUploader.url({photo.image_url, photo}, :thumb)
      }
    end

    @query """
      query($id: ID!) {
        project(id: $id) {
          id
          name
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
          photos {
            image_url
          }
        }
      }

    """
    test "project fields return projects", cxt do
      %{project: project, skill: skill, genre: genre, owner: owner, photo_url: photo_url} = cxt
      conn = build_conn()
      conn = get(conn, "/api", %{query: @query, variables: %{id: project.id}})
      response = json_response(conn, 200)

      expected_result = %{
        "project" => %{
          "id" => "#{project.id}",
          "name" => project.name,
          "leadSentence" => project.lead_sentence,
          "motivation" => project.motivation,
          "requirement" => project.requirement,
          "status" => "COMPLETED",
          "skills" => [%{"id" => "#{skill.id}", "name" => skill.name}],
          "genre" => %{"id" => "#{genre.id}", "name" => genre.name},
          "owner" => %{"id" => "#{owner.id}", "displayName" => owner.display_name},
          "photos" => [%{"image_url" => photo_url}]
        }
      }

      assert response["data"] == expected_result
    end
  end

  describe "project list query" do
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
      photo = Factory.insert(:project_photo, project: project1, is_main: true)

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
      query projects($genreId: Int, $skillIds: [Int]) {
        projects(conditions: {genreId: $genreId, skillIds: $skillIds}) {
          id
          name
          leadSentence
          mainPhotoUrl
          genre {
            id
            name
          }
        }
      }
    """
    test "projects query return projects", cxt do
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
              "name" => project1.name,
              "leadSentence" => project1.lead_sentence,
              "genre" => %{"id" => "#{genre2.id}", "name" => genre2.name},
              "mainPhotoUrl" => photo1_url
            },
            %{
              "id" => "#{project2.id}",
              "name" => project2.name,
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
