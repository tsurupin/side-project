defmodule Db.Projects.AlivePhoto do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias Db.Projects.Project
  alias Db.Uploaders.ProjectPhotoUploader

  alias __MODULE__

  @type t :: %__MODULE__{}

  schema "alive_project_photos" do
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
    required_attrs = ~w(project_id rank image_url)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> set_uuid_if_nil
    |> assoc_constraint(:project)
    |> cast_attachments(add_image_url(attrs), [:image_url])
    |> validate_required(required_attrs)
    |> unique_constraint(:project_id, name: "project_photos_project_id_and_rank_index")
    |> check_constraint(:rank, name: "valid_project_photo_rank")
  end

  @spec promote_changeset(__MODULE__.t(), map) :: Ecto.Changeset.t()
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
