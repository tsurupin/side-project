defmodule Db.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Genres.Genre
  alias Db.Projects.{Photo, Member}
  alias Db.Skills.Skill
  alias Db.Locations.City
  alias Db.Users.Favorite
  alias __MODULE__

  @type t :: %Project{}

  schema "projects" do
    field(:title, :string, null: false)
    field(:lead_sentence, :string)
    field(:deleted_at, :utc_datetime)
    field(:status, ProjectStatusEnum, default: :editing)
    field(:motivation, :string)
    field(:requirement, :string)
    field(:zip_code, :string)

    belongs_to(:owner, User)
    belongs_to(:genre, Genre)
    belongs_to(:city, City)
    has_many(:photos, Photo)

    many_to_many(:users, User, join_through: "project_members")
    many_to_many(:skills, Skill, join_through: "project_skills")

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs =
      ~w(title lead_sentence owner_id genre_id status motivation requirement city_id zip_code)a

    required_attrs = ~w(title owner_id)a

    %Project{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> assoc_constraint(:genre)
    |> assoc_constraint(:owner)
    |> assoc_constraint(:city)
    |> unique_constraint(:title, name: "projects_owner_id_and_title_index")
    |> check_constraint(:status, name: "valid_project_status")
  end

  def edit_changeset(%__MODULE__{} = project, attrs) do
    permitted_attrs = ~w(title lead_sentence genre_id motivation requirement city_id zip_code)a

    project
    |> cast(attrs, permitted_attrs)
    |> validate_blank
    |> assoc_constraint(:genre)
    |> assoc_constraint(:city)
    |> unique_constraint(:title, name: "projects_owner_id_and_title_index")
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

  def validate_blank(changeset) do
    if is_nil(get_field(changeset, :title)) do
      add_error(changeset, :title, "can't be blank")
    else
      changeset
    end
  end

end
