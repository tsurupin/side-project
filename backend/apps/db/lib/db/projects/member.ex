defmodule Db.Projects.Member do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  alias Db.Projects.Project
  alias Db.Users.User

  alias __MODULE__
  @type t :: %Member{}

  schema "project_members" do
    belongs_to(:project, Project)
    belongs_to(:user_id, User)
    field(:deleted_at, :datetime)
    field(:status, ProjectMemberStatusEnum, default: 0)
    timestamps()
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(project_id user_id status)a
    required_attrs = ~w(project_id user_id status)a

    %Member{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> assoc_constraint(:project)
    |> assoc_constraint(:user)
    |> unique_constraint(:project_id, name: "project_members_project_id_and_user_id_index")
  end
end
