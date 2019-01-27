defmodule Db.Skills.Skill do
  use Ecto.Schema
  use Db.Helpers.SoftDeletion
  import Ecto.Changeset
  alias Db.Skills.{UserSkill, ProjectSkill}
  alias __MODULE__

  @type t :: %Skill{}

  schema "skills" do
    field(:name, :string, null: false)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)

    has_many(:user_skills, UserSkill)
    has_many(:project_skills, ProjectSkill)
  end
end
