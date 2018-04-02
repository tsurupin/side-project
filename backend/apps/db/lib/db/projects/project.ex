defmodule Db.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Genres.Genre
  alias Db.Projects.Photo
  alias Db.Skills.Skill
  alias Db.Users.Favorite
  alias __MODULE__

  @type t :: %Project{}

  schema "projects" do
    field(:name, :string, null: false)
    field(:lead_sentence, :string)
    field(:deleted_at, :utc_datetime)
    field(:status, ProjectStatusEnum)
    field(:motivation, :string)
    field(:requirement, :string)

    belongs_to(:owner, User)
    belongs_to(:genre, Genre)
    has_many(:photos, Photo)
    has_many(:favorites, Favorite)
    many_to_many(:skills, Skill, join_through: "project_skills")

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name lead_sentence owner_id genre_id status motivation requirement)a
    required_attrs = ~w(name owner_id)a

    %Project{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> assoc_constraint(:genre)
    |> assoc_constraint(:owner)
    |> unique_constraint(:name, name: "projects_owner_id_and_name_index")
    |> check_constraint(:status, name: "valid_project_status")
  end

  def edit_changeset(%__MODULE__{} = project, attrs) do
    permitted_attrs = ~w(name lead_sentence genre_id motivation requirement)a

    project
    |> cast(attrs, permitted_attrs)
    |> assoc_constraint(:genre)
    |> unique_constraint(:name, name: "projects_owner_id_and_name_index")
    |> check_constraint(:status, name: "valid_project_status")
  end

  def change_status_changeset(%__MODULE__{} = project, attrs) do
    permitted_attrs = ~w(status)a
    required_attrs = ~w(status)a

    project
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> check_constraint(:status, name: "valid_project_status")
  end
end
