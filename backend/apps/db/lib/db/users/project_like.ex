defmodule Db.Users.ProjectLike do
  use Ecto.Schema
  use Db.Helpers.SoftDeletion
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

end
