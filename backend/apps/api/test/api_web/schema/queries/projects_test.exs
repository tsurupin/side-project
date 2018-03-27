defmodule ApiWeb.Schema.Queries.ProjectsTest do
  use ApiWeb.ConnCase, async: true
  alias Db.Uploaders.ProjectPhotoUploader

  describe "projects query" do
    setup do
      owner = Factory.insert(:user)
      genre = Factory.insert(:genre)
      project = Factory.insert(:project, genre: genre, owner: owner)
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
      %{project: project, skill: skill, genre: genre, owner: owner,  photo_url: photo_url} = cxt
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
          "status" => "EDITING",
          "skills" => [%{"id" => "#{skill.id}", "name" => skill.name}],
          "genre" => %{"id" => "#{genre.id}", "name" => genre.name},
          "owner" => %{"id" => "#{owner.id}", "displayName" => owner.display_name},
          "photos" => [%{"image_url" => photo_url}]
        }
      }
      IO.inspect(expected_result["data"]["updated_at"])

      assert response["data"] == expected_result
    end
  end

end
