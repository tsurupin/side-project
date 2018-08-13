defmodule Db.Skills.Skill do
  use Ecto.Schema
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

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name)a
    required_attrs = ~w(name)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:name, name: "skills_name_index")
  end

  @spec edit_changeset(Skill.t(), map()) :: Ecto.Changeset.t()
  def edit_changeset(skill, attrs) do
    permitted_attrs = ~w(name)a
    required_attrs = ~w(name)a

    skill
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:name, name: "skills_name_index")
  end
end
