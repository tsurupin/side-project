defmodule Db.Skills.ProjectSkill do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  alias Db.Skills.{Skill, Project}

  alias __MODULE__
  @type t :: %ProjectSkill{}

  schema "project_skills" do
    field(:rank, :integer, null: false, default: 0)
    belongs_to(:skill, Skill)
    belongs_to(:project, Project)

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(skill_id project_id)a
    required_attrs = ~w(skill_id project_id)a

    %ProjectSkill{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> assoc_constraint(:skill)
    |> assoc_constraint(:project)
    |> unique_constraint(:rank, name: "project_skills_project_id_and_rank_index")
    |> unique_constraint(:skill_id, name: "project_skills_project_id_and skill_id_index")
  end
end
