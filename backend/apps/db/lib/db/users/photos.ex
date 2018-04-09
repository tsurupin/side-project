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

  def upload_photo(%User{} = user, %{image: image, is_main: is_main, rank: rank} = attrs) do
    Photo.changeset(Map.put_new(attrs, :user_id, user.id))
    |> Repo.insert()
  end

  def delete_photo(photo_id) do
    case Repo.get(Photo, photo_id) do
      nil ->
        {:error, :not_found}

      %Photo{} = photo ->
        photos =
          Repo.all(from(p in Photo, where: p.user_id == ^photo.user_id and p.rank > ^photo.rank))

        Multi.new()
        |> Multi.delete(:deleted_photo, photo)
        |> promote_photos(photos, photo.rank, photo.is_main)
        |> Multi.run(:delete_image_file, fn %{deleted_photo: deleted_photo} ->
          delete_image_file(deleted_photo)
        end)
        |> Repo.transaction()
    end
  end

  defp promote_photos(multi, [], rank, is_main) do
    multi
  end

  defp promote_photos(multi, [photo | remaining], rank, is_main) do
    multi
    |> Multi.update(
      "promote_photos:#{photo.id}",
      Photo.promote_changeset(photo, %{is_main: is_main, rank: rank})
    )
    |> promote_photos(remaining, false, rank + 1)
  end

  defp delete_image_file(%Photo{image_url: image_url} = photo) do
    path =
      UserPhotoUploader.url({image_url, photo})
      |> String.split("?")
      |> List.first()

    UserPhotoUploader.delete({path, photo})
    {:ok, photo}
  end
end
