defmodule Db.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.Photo
  alias Db.OccupationTypes.OccupationType
  alias Db.Countries.Country
  alias Db.Projects.Project
  alias Db.Skills.{Skill, UserSkill}
  alias Db.Chats.Chat
  alias Db.Genres.Genre
  alias Db.Users.Favorite


  alias __MODULE__

  @type t :: %User{}

  schema "users" do
    field(:uid, :string, null: false)
    field(:provider_id, :string, null: false)
    field(:display_name, :string)
    field(:email, :string)
    field(:introduction, :string)
    field(:occupation, :string)
    field(:company_name, :string)
    field(:school_name, :string)
    field(:status, UserStatusEnum)
    field(:geom, Geo.Geometry)
    field(:last_activated_at, :utc_datetime, null: false)
    field(:area_name, :string)
    field(:longitude, :float, virtual: true)
    field(:latitude, :float, virtual: true)

    belongs_to(:occupation_type, OccupationType)
    belongs_to(:country, Country)
    belongs_to(:genre, Genre)

    has_many(:photos, Photo)
    has_many(:favorites, Favorite)
    has_many(:user_skills, UserSkill)
    many_to_many(:skills, Skill, join_through: "user_skills")
    many_to_many(:projects, Project, join_through: "project_members")
    many_to_many(:chats, Chat, join_through: "chat_members")
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attributes =
      ~w(uid provider_id display_name email occupation company_name school_name status area_name occupation_type_id country_id genre_id)a

    required_attributes = ~w(uid provider_id)a

    %User{}
    |> cast(attrs, permitted_attributes)
    |> assoc_constraint(:occupation_type)
    |> assoc_constraint(:country)
    |> assoc_constraint(:genre)
    |> validate_required(required_attributes)
    |> check_constraint(:status, name: "valid_user_status")
  end

  def edit_changeset(user, attrs) do
    permitted_attributes = ~w(display_name email occupation company_name school_name status area_name occupation_type_id genre_id longitude latitude)a
    user
    |> cast(attrs, permitted_attributes)
    |> convert_point_to_geometry
    |> assoc_constraint(:occupation_type)
    |> assoc_constraint(:genre)
    |> check_constraint(:status, name: "valid_user_status")
  end

  @srid 4326
  defp convert_point_to_geometry(changeset) do

    longitude = get_change(changeset, :longitude)
    IO.inspect(longitude)
    latitude = get_change(changeset, :latitude)
    if is_nil(longitude) or is_nil(latitude) do
      changeset
    else
      geo = %Geo.Point{coordinates: {longitude, latitude}, srid: @srid}
      put_change(changeset, :geom, geo)
    end
  end
end
