defmodule Db.Users.Photo do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Uploaders.UserPhotoUploader

  alias _MODULE__

  @type t :: %Photo{}

  schema "user_photos" do
    field :is_main, :boolean, default: false, null: false
    field :image_url, UserPhotoUploader.Type, null: false
    belongs_to(:user, User)
    timestamps()

  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do

    permitted_attrs = ~w(is_main image_url user_id)a
    required_attrs = ~w(is_main image_url user_id)a

    %Photo{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> unique_constraint(:user_id, name: "user_photos_user_id_and_is_main_index")
  end


end
