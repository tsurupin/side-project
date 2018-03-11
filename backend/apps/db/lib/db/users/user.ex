defmodule Db.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  use Ecto.Schema
  alias Db.Users.UserImage
  alias Db.OccupationType
  alias Db.Country

  schema "users" do
    field :uid, :string, null: false
    field :provider_id, :string, null: false
    field :display_name, :string
    field :email, :string
    field :occupation, :string
    field :company_name, :string
    field :school_name. :string
    field :status, UserStatusEnum
    field :latitude, :float
    field :longitude, :float
    filed :last_activated_at, :datetime, null: false
    field :area_name, :string

    has_many :images, UserImage
    belongs_to :occupation_type, OccupationType, foreign_key: :occupation_type_id
    belongs_to :country_id, Country, foreign_key: :country_id

    timestamps()
  end

  @attributes [:uid, :provider_id, :display_name, :email, :photo_url]
  @required_attributes [:uid, :provider_id]

  def changeset(user, attrs) do
    user
    |> cast(attrs, @attributes)
    |> validate_required(@required_attributes)
  end
end
