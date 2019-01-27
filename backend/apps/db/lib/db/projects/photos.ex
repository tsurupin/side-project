defmodule Db.Projects.Photos do
  @moduledoc """
  Project Photo context.
  """

  import Ecto.Query, warn: false
  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]

  alias Ecto.Multi

  alias Db.Repo
  alias Db.Projects.{Project, Photo, AlivePhoto}
  alias Db.Uploaders.ProjectPhotoUploader

  @spec upload_photo(%{required(:user_id) => integer, photo_inputs: map}) ::
          {:ok, Project.t()} | {:error, String.t()} :: {:error, :unauthorized}
  def upload_photo(%{
        user_id: user_id,
        photo_inputs: %{project_id: project_id, photo: photo, rank: rank} = attrs
      }) do
    with %Project{} = project <- Repo.get_by(Project, owner_id: user_id, id: project_id),
         {:ok, photo} <-
           Repo.insert(AlivePhoto.changeset(%{project_id: project_id, image: photo, rank: rank})) do
      {:ok, photo}
    else
      {:error, changeset} ->
        {:error, Db.FullErrorMessage.message(changeset)}

      _ ->
        {:error, :unauthorized}
    end
  end

  @spec delete_photo(%{required(:user_id) => integer, required(:photo_id) => integer}) ::
          {:ok, any()} | {:error, String.t()} | {:error, :unauthorized} | {:error, :not_found}
  def delete_photo(%{user_id: user_id, photo_id: photo_id}) do
    case Repo.one(from( p in Photo, where: p.id == ^photo_id and is_nil(p.deleted_at))) do
      nil ->
        {:error, :not_found}

      %Photo{} = photo ->
        case(Repo.get_by(Project, owner_id: user_id, id: photo.project_id)) do
          nil ->
            {:error, :unauthorized}

          %Project{} = _project ->
            photos =
              Repo.all(
                from(
                  p in AlivePhoto,
                  where: p.project_id == ^photo.project_id and p.rank > ^photo.rank,
                  order_by: [asc: p.rank]
                )
              )

            transaction =
              Multi.new()
              |> Multi.update(:deleted_photo, Photo.delete_changeset(photo))
              |> promote_photos(photos, photo.rank)
              |> Multi.run(:delete_image_file, fn _repo, %{deleted_photo: deleted_photo} ->
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
        end
    end
  end

  # @spec promote_photos(Ecto.Multi.t, [], integer) :: Ecto.Multi.t()
  defp promote_photos(multi, [], _rank), do: multi

  @spec promote_photos(Ecto.Multi.t(), nonempty_list(AlivePhoto.t()), integer) :: Ecto.Multi.t()
  defp promote_photos(multi, [photo | remaining], rank) do
    multi
    |> Multi.update(
      "promote_photos:#{photo.id}",
      AlivePhoto.promote_changeset(photo, %{rank: rank})
    )
    |> promote_photos(remaining, rank + 1)
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
