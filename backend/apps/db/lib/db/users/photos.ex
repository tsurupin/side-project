defmodule Db.Users.Photos do
  @moduledoc """
  User Photos context.
  """

  import Ecto.Query, warn: false
  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]

  alias Ecto.Multi

  alias Db.Repo
  alias Db.Users.{User, Photo, AlivePhoto}
  alias Db.Uploaders.UserPhotoUploader

  @spec upload_photo(%{user_id: integer, image: any, rank: integer}) ::
          {:ok, AlivePhoto.t()} | {:error, Ecto.Changeset.t()}
  def upload_photo(%{user_id: user_id, photo: image, rank: rank}) do
    case Repo.insert(AlivePhoto.changeset(%{image: image, user_id: user_id, rank: rank})) do
      {:ok, photo} -> {:ok, photo}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec delete_photo(integer) ::
          {:ok, any} | {:error, Ecto.Muti.name(), any} | {:error, :not_found}
  def delete_photo(photo_id) do
    case Repo.one(from( p in Photo, where: p.id == ^photo_id and is_nil(p.deleted_at))) do
      nil ->
        {:error, :not_found}

      %Photo{} = photo ->
        photos =
          Repo.all(from(p in AlivePhoto, where: p.user_id == ^photo.user_id and p.rank > ^photo.rank))

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
            {:error, Db.FullErrorMessage.message(changeset)}
        end
    end
  end

  # @spec promote_photos(Ecto.Multi.t(), [], integer) :: Ecto.Multi.t()
  defp promote_photos(multi, [], _rank), do: multi

  @spec promote_photos(Ecto.Multi.t(), [AlivePhoto.t()], integer) :: Ecto.Multi.t()
  defp promote_photos(multi, [photo | remaining], rank) do
    multi
    |> Multi.update(
      "promote_photos:#{photo.id}",
      AlivePhoto.promote_changeset(photo, %{rank: rank})
    )
    |> promote_photos(remaining, rank - 1)
  end

  @spec delete_image_file(Photo.t()) :: {:ok, Photo.t()}
  defp delete_image_file(%Photo{image_url: image_url} = photo) do
    path =
      UserPhotoUploader.url({image_url, photo})
      |> String.split("?")
      |> List.first()

    UserPhotoUploader.delete({path, photo})
    {:ok, photo}
  end
end
