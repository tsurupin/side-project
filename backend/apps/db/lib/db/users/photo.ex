defmodule Db.Users.Photo do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Uploaders.UserPhotoUploader

  alias __MODULE__

  @type t :: %Photo{}

  schema "user_photos" do
    field(:is_main, :boolean, default: false, null: false)
    field(:image_url, UserPhotoUploader.Type)
    field(:deleted_at, :utc_datetime)
    belongs_to(:user, User)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(is_main user_id)a
    required_attrs = ~w(is_main user_id)a

    %Photo{}
    |> cast(attrs, permitted_attrs)
    |> assoc_constraint(:user)
    |> cast_attachments(attrs, [:image_url])
    |> validate_required(required_attrs)
    |> unique_constraint(:user_id, name: "user_photos_user_id_and_is_main_index")
  end
end
