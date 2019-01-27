defmodule Db.Projects.Project do
  use Ecto.Schema
  use Db.Helpers.SoftDeletion
  import Ecto.Changeset
  alias Db.Users.{User, ProjectLike}
  alias Db.Genres.Genre
  alias Db.Projects.{Photo, Member}
  alias Db.Skills.Skill
  alias Db.Locations.City
  alias Db.Users.Favorite
  alias __MODULE__

  @type t :: %Project{}

  schema "projects" do
    field(:title, :string, null: false)
    field(:lead_sentence, :string)
    field(:deleted_at, :utc_datetime)
    field(:status, ProjectStatusEnum, default: :editing)
    field(:motivation, :string)
    field(:requirement, :string)
    field(:zip_code, :string)
    field(:has_liked, :boolean, virtual: true)

    belongs_to(:owner, User)
    belongs_to(:genre, Genre)
    belongs_to(:city, City)
    has_many(:photos, Photo)
    has_many(:project_likes, ProjectLike)

    many_to_many(:users, User, join_through: "project_members")
    many_to_many(:skills, Skill, join_through: "project_skills")

    timestamps(type: :utc_datetime)
  end


end
