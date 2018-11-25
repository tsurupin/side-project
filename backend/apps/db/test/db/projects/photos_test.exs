defmodule Db.ProjectPhotosTest do
  use Db.DataCase
  alias Db.Projects

  describe "upload_photo/2" do
    test "succeeds to create a photo" do
      project = Factory.insert(:project)

      image = %Plug.Upload{
        content_type: "image/jpeg",
        filename: "project1.jpg",
        path: Path.join(__DIR__, "../../../priv/repo/images/seeds/project1.jpg")
      }

      inputs = %{project_id: project.id, photo: image, rank: 0}

      assert {:ok, _photo} =
               Projects.Photos.upload_photo(%{user_id: project.owner_id, photo_inputs: inputs})
    end

    test "fails to create a photo because of invalid url" do
      project = Factory.insert(:project)

      image = %Plug.Upload{
        content_type: "image/jpeg",
        filename: "project1.jpg",
        path: "bad.jpg"
      }

      inputs = %{project_id: project.id, photo: image, rank: 0}

      assert {:error, "image_url: is invalid"} =
               Projects.Photos.upload_photo(%{user_id: project.owner_id, photo_inputs: inputs})
    end

    test "fails to create a photo with unauthorized" do
      project = Factory.insert(:project)

      image = %Plug.Upload{
        content_type: "image/jpeg",
        filename: "project1.jpg",
        path: Path.join(__DIR__, "../../../priv/repo/images/seeds/project1.jpg")
      }

      inputs = %{project_id: project.id, photo: image, rank: 0}

      assert {:error, :unauthorized} =
               Projects.Photos.upload_photo(%{user_id: project.owner_id + 1, photo_inputs: inputs})
    end
  end

  describe "delete_photo/2" do
    test "fails to delete because photo doesn't exist" do
      project = Factory.insert(:project)

      assert {:error, :not_found} =
               Projects.Photos.delete_photo(%{
                 user_id: project.owner_id,
                 photo_id: 1_000_000
               })
    end

    test "fails to delete because user is not project owner" do
      project = Factory.insert(:project)
      photo = Factory.insert(:project_photo, project: project, rank: 0)

      assert {:error, :unauthorized} =
               Projects.Photos.delete_photo(%{
                 user_id: project.owner_id + 1,
                 photo_id: photo.id
               })
    end

    test "succeeds to delete a photo" do
      project = Factory.insert(:project)
      main_photo = Factory.insert(:project_photo, project: project, rank: 0)
      other_photo = Factory.insert(:project_photo, project: project, rank: 1)

      assert {:ok, photo} =
               Projects.Photos.delete_photo(%{user_id: project.owner_id, photo_id: main_photo.id})

      other_photo = Db.Repo.get(Projects.Photo, other_photo.id)
      assert other_photo.rank == photo.rank
    end
  end
end
