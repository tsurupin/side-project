defmodule Db.Projects.Photos do
  @moduledoc """
  The ProjectPhotos context.
  """

  import Ecto.Query, warn: false
  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]

  alias Ecto.Multi

  alias Db.Repo
  alias Db.Projects.{Project, Photo}
  alias Db.Uploaders.ProjectPhotoUploader

  def upload_photo(user_id, %{project_id: project_id, image: image, is_main: is_main, rank: rank} = attrs) do
    case Repo.get_by(Project, owner_id: user_id, project_id: project_id) do
      nil -> {:error, :unauthorized}
      %Project{} = _project ->
        Photo.changeset(attrs)
        |> Repo.insert
    end
  end

  def delete_photo(user_id, photo_id) do
    case Repo.get(Photo, photo_id) do
      nil -> {:error, :not_found}
      %Photo{} = photo ->
        case Repo.get_by(Project, owner_id: user_id, project_id: photo.project_id) do
          nil -> {:error, :unauthorized}
          %Project{} = _project ->
            photos = Repo.all(from p in Photo, where: p.project_id == ^photo.project_id and p.rank > ^photo.rank)

            Multi.new
            |> Multi.delete(:deleted_photo, photo)
            |> promote_photos(photos, photo.rank, photo.is_main)
            |> Multi.run(:delete_image_file, fn %{deleted_photo: deleted_photo} -> delete_image_file(deleted_photo) end)
            |> Repo.transaction
        end
    end
  end


  defp promote_photos(multi, [], rank, is_main) do
    multi
  end

  defp promote_photos(multi, [photo | remaining], rank, is_main) do
    multi
    |> Multi.update("promote_photos:#{photo.id}", Photo.promote_changeset(photo, %{is_main: is_main, rank: rank}))
    |> promote_photos(remaining, false, rank + 1)
  end

  defp delete_image_file(%Photo{image_url: image_url} = photo) do
    path =
      ProjectPhotoUploader.url({image_url, photo})
      |> String.split("?")
      |> List.first
    ProjectPhotoUploader.delete({path, photo})
    {:ok, photo}
  end

end
