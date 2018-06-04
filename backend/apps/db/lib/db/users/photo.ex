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
    field(:rank, :integer, null: false)
    field(:image_url, UserPhotoUploader.Type)
    field(:deleted_at, :utc_datetime)
    belongs_to(:user, User)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(user_id rank)a
    required_attrs = ~w(user_id rank)a

    attrs =
      case attrs[:image] do
        %Plug.Upload{} -> Map.merge(attrs, %{image_url: attrs[:image]})
        _ -> attrs
      end

    %Photo{}
    |> cast(attrs, permitted_attrs)
    |> assoc_constraint(:user)
    |> cast_attachments(attrs, [:image_url])
    |> validate_required(required_attrs)
    |> validate_negative_rank()
    |> unique_constraint(:user_id, name: "user_photos_user_id_and_is_main_index")
    |> unique_constraint(:user_id, name: "user_photos_user_id_and_rank_index")
  end

  @spec promote_changeset(Photo.t(), map) :: Ecto.Changeset.t()
  def promote_changeset(photo, attrs) do
    permitted_attrs = ~w(rank)a
    required_attrs = ~w(rank)a

    photo
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> validate_negative_rank()
    |> unique_constraint(:user_id, name: "user_photos_user_id_and_is_main_index")
    |> unique_constraint(:user_id, name: "user_photos_user_id_and_rank_index")
  end

  @spec validate_negative_rank(Ecto.Changeset.t(), []) :: Ecto.Changeset.t()
  defp validate_negative_rank(changeset, _opts \\ []) do
    validate_change(changeset, :rank, fn :rank, rank  ->
      if rank < 0 do
        [rank: "should be more than 0"]
      else
        []
      end
    end)
  end

end
