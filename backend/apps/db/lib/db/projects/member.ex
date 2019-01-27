defmodule Db.Projects.Member do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  use Db.Helpers.SoftDeletion
  alias Db.Projects.Project
  alias Db.Users.User

  alias __MODULE__
  @type t :: %Member{}

  schema "project_members" do
    belongs_to(:project, Project)
    belongs_to(:user, User)
    field(:deleted_at, :utc_datetime)
    field(:status, ProjectMemberStatusEnum, default: :requested)
    field(:role, ProjectMemberRoleEnum, default: :user)
    timestamps(type: :utc_datetime)
  end

end
