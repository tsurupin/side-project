defmodule Db.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.{UserLike, Photo}
  alias Db.OccupationTypes.OccupationType
  alias Db.Locations.City
  alias Db.Projects.Project
  alias Db.Skills.{Skill, UserSkill}
  alias Db.Chats.Chat
  alias Db.Genres.Genre

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
    field(:status, UserStatusEnum, default: :editing)
    field(:geom, Geo.PostGIS.Geometry)
    field(:last_activated_at, :utc_datetime, null: false)
    field(:zip_code, :string)
    field(:longitude, :float, virtual: true)
    field(:latitude, :float, virtual: true)
    field(:has_liked, :boolean, virtual: true)

    belongs_to(:occupation_type, OccupationType)
    belongs_to(:city, City)
    belongs_to(:genre, Genre)

    has_many(:photos, Photo)
    has_many(:user_likes, UserLike)
    has_many(:user_skills, UserSkill)
    many_to_many(:skills, Skill, join_through: "user_skills")
    many_to_many(:projects, Project, join_through: "project_members")
    many_to_many(:chats, Chat, join_through: "chat_members")
    timestamps(type: :utc_datetime)
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attributes =
      ~w(uid provider_id display_name introduction email occupation company_name school_name status city_id zip_code occupation_type_id genre_id)a

    required_attributes = ~w(uid provider_id)a

    %User{}
    |> cast(attrs, permitted_attributes)
    |> assoc_constraint(:occupation_type)
    |> assoc_constraint(:city)
    |> assoc_constraint(:genre)
    |> validate_required(required_attributes)
    |> check_constraint(:status, name: "valid_user_status")
    |> check_constraint(:provider_id, name: "vusers_provider_id_and_uid_index")
    |> check_constraint(:email, name: "users_email_index")
  end

  @spec edit_changeset(User.t(), map()) :: Ecto.Changeset.t()
  def edit_changeset(user, attrs) do
    permitted_attributes =
      ~w(display_name introduction email occupation company_name school_name status city_id zip_code occupation_type_id genre_id longitude latitude)a

    user
    |> cast(attrs, permitted_attributes)
    |> convert_point_to_geometry
    |> validate_blank
    |> assoc_constraint(:occupation_type)
    |> assoc_constraint(:genre)
    |> check_constraint(:status, name: "valid_user_status")
    |> check_constraint(:provider_id, name: "users_provider_id_and_uid_index")
    |> check_constraint(:email, name: "users_email_index")
  end

  @srid 4326
  @spec convert_point_to_geometry(Ecto.Changeset.t()) :: Ecto.Changeset.t()
  defp convert_point_to_geometry(changeset) do
    longitude = get_change(changeset, :longitude)
    latitude = get_change(changeset, :latitude)

    if is_nil(longitude) or is_nil(latitude) do
      changeset
    else
      geo = %Geo.Point{coordinates: {latitude, longitude}, srid: @srid}
      put_change(changeset, :geom, geo)
    end
  end

  def validate_blank(changeset) do
    if is_nil(get_field(changeset, :display_name)) do
      add_error(changeset, :display_name, "can't be blank")
    else
      changeset
    end
  end
end
