defmodule Db.Users.Photo do
  use Ecto.Schema
  use Arc.Ecto.Schema
  use Db.Helpers.SoftDeletion
  import Ecto.Changeset

  alias Db.Users.User
  alias Db.Uploaders.UserPhotoUploader

  alias __MODULE__

  @type t :: %__MODULE__{}

  schema "user_photos" do
    field(:rank, :integer, null: false)
    field(:image_url, UserPhotoUploader.Type)
    field(:uuid, :string, null: false)
    field(:deleted_at, :utc_datetime)
    belongs_to(:user, User)
    timestamps(type: :utc_datetime)
  end

end
