defmodule Db.UserPhotosTest do
  use Db.DataCase
  alias Db.Users

  describe "upload_photo/1" do
    test "succeeds to create a photo" do
      user = Factory.insert(:user)

      image = %Plug.Upload{
        content_type: "image/jpeg",
        filename: "user1.jpg",
        path: Path.join(__DIR__, "../../../priv/repo/images/seeds/user1.jpg")
      }

      inputs = %{user_id: user.id, photo: image, rank: 0}

      assert {:ok, photo } = Users.Photos.upload_photo(inputs)
    end

    test "fails to create a photo because of invalid url" do
      user = Factory.insert(:user)

      image = %Plug.Upload{
        content_type: "image/jpeg",
        filename: "user1.jpg",
        path: "bad.jpg"
      }

      inputs = %{user_id: user.id, photo: image, rank: 0}

      assert {:error, "image_url: is invalid"} = Users.Photos.upload_photo(inputs)
    end
  end

  describe "delete_photo/1" do
    test "fails to delete because photo doesn't exist" do
      project = Factory.insert(:user)

      assert {:error, :not_found} = Users.Photos.delete_photo(1_000_000)
    end


    test "succeeds to delete a photo" do
      user = Factory.insert(:user)
      main_photo = Factory.insert(:user_photo, user: user, rank: 0)
      other_photo = Factory.insert(:user_photo, user: user, rank: 1)

      assert {:ok, photo} =
               Users.Photos.delete_photo(main_photo.id)

      other_photo = Db.Repo.get(Users.Photo, other_photo.id)
      assert other_photo.rank == photo.rank
    end
  end
end
