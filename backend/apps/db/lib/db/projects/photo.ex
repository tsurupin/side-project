defmodule Db.Projects.Photo do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias Db.Projects.Project
  alias Db.Uploaders.ProjectPhotoUploader

  alias __MODULE__

  @type t :: %Photo{}

  schema "project_photos" do
    field(:is_main, :boolean, default: false, null: false)
    field(:rank, :integer, null: false)
    field(:image_url, ProjectPhotoUploader.Type, null: false)
    belongs_to(:project, Project)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(is_main project_id)a
    required_attrs = ~w(is_main image_url project_id)a

    %Photo{}
    |> cast(attrs, permitted_attrs)
    |> assoc_constraint(:project)
    |> cast_attachments(attrs, [:image_url])
    |> validate_required(required_attrs)
    |> unique_constraint(:project_id, name: "project_photos_project_id_and_is_main_index")
    |> unique_constraint(:project_id, name: "project_photos_project_id_and_rank_index")
  end

  @spec promote_changeset(Photo.t, map) :: Ecto.Changeset.t()
  def promote_changeset(photo, attrs) do
    permitted_attrs = ~w(is_main rank)a
    required_attrs = ~w(is_main rank)a

    photo
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:project_id, name: "project_photos_project_id_and_is_main_index")
    |> unique_constraint(:project_id, name: "project_photos_project_id_and_rank_index")
  end
end
