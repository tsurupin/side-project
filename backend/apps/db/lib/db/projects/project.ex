defmodule Db.Skills.Skill do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Genres.Genre
  alias Db.Projects.Photo
  alias __MODULE__

  @type t :: %Project{}

  schema "projects" do
    field(:name, :string)
    field(:lead_sentence, :string)
    field(:why, :string)
    field(:deleted_at, :datetime)
    field(:status, ProjectStatusEnum)
    field(:motivation, :string)
    field(:requirement, :string)
    has_many(:photos, Photo)
    belongs_to(:owner, User)
    belongs_to(:genre, Genre)
    many_to_many(:skills, join_through: "project_skills")

    timestamps()
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name lead_sentence why owner_id genre_id status motivation requirement)a
    required_attrs = ~w(owner_id)a

    %Project{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> assoc_constraint(:genre)
    |> assoc_constraint(:owner)
    |> unique_constraint(:name, name: "projects_name_and_is_main_index")
  end
end
