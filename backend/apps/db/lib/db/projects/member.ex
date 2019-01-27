defmodule Db.Projects.Member do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
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


  @spec delete_changeset(Member.t(), %{deleted_at: any}) :: Ecto.Changeset.t()
  def delete_changeset(%Member{} = member, %{deleted_at: _deleted_at} = attrs) do
    permitted_attrs = ~w(deleted_at)a
    required_attrs = ~w(deleted_at)a

    member
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
  end
end
