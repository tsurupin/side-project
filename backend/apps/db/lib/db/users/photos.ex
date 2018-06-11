defmodule Db.Users.Photos do
  @moduledoc """
  The UserPhotos context.
  """

  import Ecto.Query, warn: false
  import Ecto.Query, only: [from: 1, from: 2, first: 1, limit: 2]

  alias Ecto.Multi

  alias Db.Repo
  alias Db.Users.{User, Photo}
  alias Db.Uploaders.UserPhotoUploader

  @spec upload_photo(User.t(), %{image: any, rank: integer}) ::
          {:ok, Photo.t()} | {:error, Ecto.Changeset.t()}
  def upload_photo(%User{} = user, %{photo: image, rank: rank} = attrs) do
    Photo.changeset(%{image: image, user_id: user.id, rank: rank})
    |> Repo.insert()
  end

  @spec delete_photo(integer) ::
          {:ok, any} | {:error, Ecto.Muti.name(), any} | {:error, :not_found}
  def delete_photo(photo_id) do
    case Repo.get(Photo, photo_id) do
      nil ->
        {:error, :not_found}

      %Photo{} = photo ->
        photos =
          Repo.all(from(p in Photo, where: p.user_id == ^photo.user_id and p.rank > ^photo.rank))

        Multi.new()
        |> Multi.delete(:deleted_photo, photo)
        |> promote_photos(photos, photo.rank)
        |> Multi.run(:delete_image_file, fn %{deleted_photo: deleted_photo} ->
          delete_image_file(deleted_photo)
        end)
        |> Repo.transaction()
    end
  end

  # @spec promote_photos(Ecto.Multi.t(), [], integer) :: Ecto.Multi.t()
  defp promote_photos(multi, [], _rank), do: multi

  @spec promote_photos(Ecto.Multi.t(), [Photo.t()], integer) :: Ecto.Multi.t()
  defp promote_photos(multi, [photo | remaining], rank) do
    multi
    |> Multi.update(
      "promote_photos:#{photo.id}",
      Photo.promote_changeset(photo, %{rank: rank})
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
