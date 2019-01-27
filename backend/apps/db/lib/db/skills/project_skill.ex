defmodule Db.Skills.ProjectSkill do
  use Ecto.Schema
  use Db.Helpers.SoftDeletion
  import Ecto.{Changeset, Query}
  alias Db.Skills.Skill
  alias Db.Projects.Project

  alias __MODULE__
  @type t :: %ProjectSkill{}

  schema "project_skills" do
    field(:rank, :integer, null: false)
    field(:deleted_at, :utc_datetime)
    belongs_to(:skill, Skill)
    belongs_to(:project, Project)

    timestamps(type: :utc_datetime)
  end

end
