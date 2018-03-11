defmodule Db.Chats.Chat do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Chats.{Content, Member, Project}

  alias __MODULE__

  @type t :: %Chat{}

  schema "chats" do
    field(:name, :string, null: false)
    field(:type, ChatTypeEnum)
    timestamps()

    has_many(:contents, Content)
    many_to_many(:users, join_through: "chat_members")
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name type)a
    required_attrs = ~w(name type)a

    %Chat{}
    |> cast(attrs, permitted_attrs)
    |> validate_required(attrs, required_attrs)
    |> unique_constraint(:name, name: "chats_name_index")
  end
end
