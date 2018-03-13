defmodule Db.Chats.Chat do
  use Ecto.Schema
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Chats.{Content, Member, Project, Group}

  alias __MODULE__

  @type t :: %Chat{}

  schema "chats" do
    field(:name, :string, null: false)
    field(:is_main, :boolean, null: false, default: false)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)

    belongs_to(:chat_group, ChatGroup)
    has_many(:contents, Content)
    many_to_many(:users, User, join_through: "chat_members")
  end

  @spec changeset(map()) :: Ecto.Changeset.t()
  def changeset(attrs) do
    permitted_attrs = ~w(name is_main chat_group_id)a
    required_attrs = ~w(name is_main chat_group_id)a

    %Chat{}
    |> cast(attrs, permitted_attrs)
    |> assoc_constraint(:chat_group)
    |> validate_required(required_attrs)
    |> unique_constraint(:name, name: "chats_chat_group_id_and_name_index")
  end
end
