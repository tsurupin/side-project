defmodule Db.Users.ProjectLike do
  use Ecto.Schema
  use Db.Helper.SoftDeletion
  import Ecto.{Changeset, Query}
  alias Db.Users.{User}
  alias Db.Projects.Project

  alias __MODULE__

  @type t :: %ProjectLike{}

  schema "project_likes" do
    belongs_to(:user, User)
    belongs_to(:project, Project)
    field(:deleted_at, :utc_datetime)
    field(:status, ProjectLikeStatusEnum, default: :requested)
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(user_id project_id status)a
    required_attrs = ~w(user_id project_id)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> assoc_constraint(:user)
    |> assoc_constraint(:project)
    |> unique_constraint(:user_id, name: "project_likes_unique_index")
  end

  @spec approve_changeset(ProjectLike.t(), map) :: Ecto.Changeset.t()
  def approve_changeset(%__MODULE__{} = like, attrs) do
    permitted_attrs = ~w(status)a
    required_attrs = ~w(status)a

    like
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> unique_constraint(:user_id, name: "project_likes_unique_index")
  end
end
