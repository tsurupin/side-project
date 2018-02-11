defmodule Db.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :provider_id, :string, null: false
      add :uid, :string, null: false
      add :display_name, :string
      add :email, :string
      add :photo_url, :string

      timestamps()
    end
    create index(:users, [:provider_id, :uid], unique: true)
    create index(:users, [:email], unique: true)
  end
end
