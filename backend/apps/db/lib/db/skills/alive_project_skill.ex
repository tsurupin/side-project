defmodule Db.Skills.AliveProjectSkill do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  alias Db.Skills.Skill
  alias Db.Projects.Project

  alias __MODULE__
  @type t :: %ProjectSkill{}

  schema "alive_project_skills" do
    field(:rank, :integer, null: false)
    field(:deleted_at, :utc_datetime)
    belongs_to(:skill, Skill)
    belongs_to(:project, Project)

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(skill_id project_id rank)a
    required_attrs = ~w(skill_id project_id rank)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> assoc_constraint(:skill)
    |> assoc_constraint(:project)
    |> unique_constraint(:skill_id, name: "project_skills_project_id_and_product_id_index")

    # |> unique_constraint(:rank, name: "project_skills_project_id_and_rank_index")
  end

  @spec edit_changeset(ProjectSkill.t(), map()) :: Ecto.Changeset.t()
  def edit_changeset(project_skill, attrs) do
    permitted_attrs = ~w(rank)a
    required_attrs = ~w(rank)a

    project_skill
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)

    # |> unique_constraint(:rank, name: "project_skills_project_id_and_rank_index")
  end
end
