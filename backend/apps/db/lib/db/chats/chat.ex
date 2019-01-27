defmodule Db.Chats.Chat do
  use Ecto.Schema
  use Db.Helpers.SoftDeletion
  import Ecto.Changeset
  alias Db.Users.User
  alias Db.Chats.{Message, Member, Project, Group}

  alias __MODULE__

  @type t :: %Chat{}

  schema "chats" do
    field(:name, :string, null: false)
    field(:is_main, :boolean, null: false, default: false)
    field(:deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)

    belongs_to(:chat_group, Group)
    has_many(:messages, Message)
    many_to_many(:users, User, join_through: "chat_members")
  end

end
