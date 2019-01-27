defmodule Db.Projects.Photo do
  use Ecto.Schema
  use Arc.Ecto.Schema
  use Db.Helpers.SoftDeletion
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

  
end
