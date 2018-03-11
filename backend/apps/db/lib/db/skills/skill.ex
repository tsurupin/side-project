defmodule Db.Skills.Skill do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Skills.{SkProjectSkill}
  alias __MODULE__

  @type t :: %Skill{}

  schema "skills" do
    field(:name, :string, null: false)
    timestamps()

    has_many(:user_skills, UserSkill)
    has_many(:project_skills, ProjectSkill)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name)a
    required_attrs = ~w(name)a

    %Skill{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> unique_constraint(:name, name: "skills_name_index")
  end
end
