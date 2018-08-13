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

  @spec upload_photo(integer, map) ::
          {:ok, Project.t()} | {:error, String.t()} :: {:error, :unauthorized}
  def upload_photo(
        user_id,
        %{project_id: project_id, photo: photo, rank: rank} = attrs
      ) do
    with %Project{} = project <- Repo.get_by(Project, owner_id: user_id, id: project_id),
         {:ok, photo} <-
           Repo.insert(Photo.changeset(%{project_id: project_id, image: photo, rank: rank})) do
      {:ok, photo}
    else
      {:error, changeset} ->
        {:error, Db.FullErrorMessage.message(changeset)}

      _ ->
        {:error, :unauthorized}
    end
  end

  @spec delete_photo(integer, integer) ::
          {:ok, any()} | {:error, String.t()} | {:error, :unauthorized} | {:error, :not_found}
  def delete_photo(user_id, photo_id) do
    case Repo.get(Photo, photo_id) do
      %Photo{} = photo ->
        case Repo.get_by(Project, owner_id: user_id, id: photo.project_id) do
          %Project{} = _project ->
            photos =
              Repo.all(
                from(
                  p in Photo,
                  where: p.project_id == ^photo.project_id and p.rank > ^photo.rank,
                  order_by: [asc: p.rank]
                )
              )

            transaction =
              Multi.new()
              |> Multi.delete(:deleted_photo, photo)
              |> promote_photos(photos)
              |> Multi.run(:delete_image_file, fn %{deleted_photo: deleted_photo} ->
                delete_image_file(deleted_photo)
              end)
              |> Repo.transaction()

            case transaction do
              {:ok, _} ->
                {:ok, photo}

              {:error, _name, changeset, _prev} ->
                IO.inspect(changeset)
                {:error, Db.FullErrorMessage.message(changeset)}
            end

          _ ->
            {:error, :unauthorized}
        end

      _ ->
        {:error, :not_found}
    end
  end

  # @spec promote_photos(Ecto.Multi.t, [], integer) :: Ecto.Multi.t()
  defp promote_photos(multi, []), do: multi

  @spec promote_photos(Ecto.Multi.t(), nonempty_list(Photo.t())) :: Ecto.Multi.t()
  defp promote_photos(multi, [photo | remaining]) do
    multi
    |> Multi.update(
      "promote_photos:#{photo.id}",
      Photo.promote_changeset(photo, %{rank: photo.rank - 1})
    )
    |> promote_photos(remaining)
  end

  @spec delete_image_file(Photo.t()) :: {:ok, Photo.t()}
  defp delete_image_file(%Photo{image_url: image_url} = photo) do
    path =
      ProjectPhotoUploader.url({image_url, photo})
      |> String.split("?")
      |> List.first()

    ProjectPhotoUploader.delete({path, photo})
    {:ok, photo}
  end
end
