defmodule Db.Skills.UserSkill do
  use Ecto.Schema
  use Db.Helpers.SoftDeletion
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

end
