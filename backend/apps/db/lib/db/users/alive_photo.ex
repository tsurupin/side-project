defmodule Db.Users.AlivePhoto do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Uploaders.UserPhotoUploader

  alias __MODULE__

  @type t :: %__MODULE__{}

  schema "alive_user_photos" do
    field(:rank, :integer, null: false)
    field(:image_url, UserPhotoUploader.Type)
    field(:deleted_at, :utc_datetime)
    field(:uuid, :string, null: false)
    belongs_to(:user, User)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(user_id rank uuid)a
    required_attrs = ~w(user_id rank image_url)a

    IO.inspect(attrs)

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> set_uuid_if_nil
    |> assoc_constraint(:user)
    |> cast_attachments(add_image_url(attrs), [:image_url])
    |> validate_required(required_attrs)
    |> unique_constraint(:user_id, name: "user_photos_user_id_and_rank_index")
    |> check_constraint(:rank, name: "valid_user_photo_rank")
  end

  @spec promote_changeset(__MODULE__.t(), map) :: Ecto.Changeset.t()
  def promote_changeset(photo, attrs) do
    permitted_attrs = ~w(rank)a
    required_attrs = ~w(rank)a

    photo
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:user_id, name: "user_photos_user_id_and_rank_index")
    |> check_constraint(:rank, name: "valid_user_photo_rank")
  end

  defp set_uuid_if_nil(changeset) do
    if is_nil(get_field(changeset, :uuid)) do
      force_change(changeset, :uuid, Ecto.UUID.generate())
    else
      changeset
    end
  end

  defp add_image_url(attrs) do
    case attrs[:image] do
      nil -> attrs
      image -> Map.merge(attrs, %{image_url: image})
    end
  end
end
