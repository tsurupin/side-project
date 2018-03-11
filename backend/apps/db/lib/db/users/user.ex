defmodule Db.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.Photo
  alias Db.OccupationType
  alias Db.Country

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
    field(:last_activated_at, :datetime, null: false)
    field(:area_name, :string)

    has_many(:photos, Photo)
    belongs_to(:occupation_type, OccupationType, foreign_key: :occupation_type_id)
    belongs_to(:country_id, Country, foreign_key: :country_id)
    many_to_many(:skills, join_through: "user_skills")
    many_to_many(:projects, join_through: "project_members")
    many_to_many(:chats, join_through: "chat_members")

    timestamps()
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(user, attrs) do
    permitted_attributes = ~w(uid provider_id display_name email)a
    required_attributes = ~w(uid provider_id)a

    %User{}
    |> cast(attrs, permitted_attributes)
    |> validate_required(attrs, required_attributes)
  end
end
