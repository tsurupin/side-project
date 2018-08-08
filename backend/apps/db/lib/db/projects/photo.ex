defmodule Db.Projects.Photo do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias Db.Projects.Project
  alias Db.Uploaders.ProjectPhotoUploader

  alias __MODULE__

  @type t :: %Photo{}

  schema "project_photos" do
    field(:rank, :integer, null: false)
    field(:uuid, :string, null: false)
    field(:image_url, ProjectPhotoUploader.Type)
    belongs_to(:project, Project)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(project_id rank uuid)a
    required_attrs = ~w(project_id rank)a
    attrs =
      case attrs[:image] do
        %Plug.Upload{} -> Map.merge(attrs, %{image_url: attrs[:image]})
        _ -> attrs
      end

    %Photo{}
    |> cast(attrs, permitted_attrs)
    |> set_uuid_if_nil
    |> assoc_constraint(:project)
    |> cast_attachments(attrs, [:image_url])
    |> validate_required(required_attrs)
    |> unique_constraint(:project_id, name: "project_photos_project_id_and_rank_index")
    |> check_constraint(:rank, name: "valid_project_photo_rank")
  end

  @spec promote_changeset(Photo.t(), map) :: Ecto.Changeset.t()
  def promote_changeset(photo, attrs) do
    permitted_attrs = ~w(rank)a
    required_attrs = ~w(rank)a

    photo
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:project_id, name: "project_photos_project_id_and_rank_index")
    |> check_constraint(:rank, name: "valid_project_photo_rank")
  end

  defp set_uuid_if_nil(changeset) do
    if get_field(changeset, :uuid) == nil do
      force_change(changeset, :uuid, Ecto.UUID.generate())
    else
      changeset
    end
  end
end
