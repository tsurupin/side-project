defmodule Db.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.Photo
  alias Db.OccupationType
  alias Db.Country
  alias Db.Projects.Project
  alias Db.Skills.Skill
  alias Db.Chats.Chat
  alias Db.Genres.Genre

  alias __MODULE__

  @type t :: %User{}

  schema "users" do
    field(:uid, :string, null: false)
    field(:provider_id, :string, null: false)
    field(:display_name, :string)
    field(:email, :string)
    field(:occupation, :string)
    field(:company_name, :string)
    field(:school_name, :string)
    field(:status, UserStatusEnum)
    field(:latitude, :float)
    field(:longitude, :float)
    field(:last_activated_at, :utc_datetime, null: false)
    field(:area_name, :string)
    belongs_to(:occupation_type, OccupationType)
    belongs_to(:country, Country)
    belongs_to(:genre, Genre)

    has_many(:photos, Photo)
    many_to_many(:skills, Skill, join_through: "user_skills")
    many_to_many(:projects, Project, join_through: "project_members")
    many_to_many(:chats, Chat, join_through: "chat_members")

    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attributes =
      ~w(uid provider_id display_name email occupation company_name school_name status latitude longitude area_name occupation_type_id country_id genre_id)a

    required_attributes = ~w(uid provider_id)a

    %User{}
    |> cast(attrs, permitted_attributes)
    |> validate_required(attrs, required_attributes)
    |> check_constraint(:status, name: "valid_user_status")
  end
end
