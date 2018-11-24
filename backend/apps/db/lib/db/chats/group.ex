defmodule Db.Chats.Group do
  @moduledoc """

  """
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Chats.{Chat}

  alias __MODULE__

  @type t :: %Group{}

  schema "chat_groups" do
    field(:source_id, :integer, null: false)
    field(:source_type, :string, null: false)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)

    has_many(:chats, Chat)
  end

  @source_types ~w(UserLike Project)a
  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(source_id source_type)a
    required_attrs = ~w(source_id source_type)a

    %__MODULE__{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
    |> validate_inclusion(:source_type, @source_types)
    |> unique_constraint(:source_id, name: "chat_groups_source_id_and_source_type_index")
  end
end
