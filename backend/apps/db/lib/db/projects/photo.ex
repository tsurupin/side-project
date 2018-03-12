defmodule Db.Projects.Photo do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias Db.Projects.Project
  alias Db.ProjectPhotoUploader

  alias __MODULE__

  @type t :: %Photo{}

  schema "user_photos" do
    field(:is_main, :boolean, default: false, null: false)
    field(:image_url, ProjectPhotoUploader.Type, null: false)
    belongs_to(:project, Project)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(is_main image_url project_id)a
    required_attrs = ~w(is_main image_url project_id)a

    %Photo{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> unique_constraint(:user_id, name: "project_photos_project_id_and_is_main_index")
  end
end
