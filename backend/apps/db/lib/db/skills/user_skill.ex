defmodule Db.Skills.UserSkill do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  alias Db.Skills.{Skill}
  alias Db.Users.User

  alias __MODULE__

  @type t :: %UserSkill{}

  schema "user_skills" do
    field(:rank, :integer, null: false)
    field(:deleted_at, :utc_datetime)
    belongs_to(:skill, Skill)
    belongs_to(:user, User)

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(skill_id user_id rank)a
    required_attrs = ~w(skill_id user_id rank)a

    %UserSkill{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> assoc_constraint(:skill)
    |> assoc_constraint(:user)
    |> unique_constraint(:skill_id, name: "user_skills_skill_id_and_user_id_index")
    |> unique_constraint(:rank, name: "user_skills_user_id_and_rank_index")
  end
end
