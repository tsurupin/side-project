defmodule Db.OccupationTypes.OccupationType do
  @moduledoc """

  """
  use Ecto.Schema
  use Db.Helpers.SoftDeletion
  import Ecto.Changeset
  alias Db.Users.User
  alias __MODULE__

  @type t :: %OccupationType{}

  schema "occupation_types" do
    field(:name, :string, null: false)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)

    has_many(:users, User)
  end
end
