defmodule Db.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :display_name, :string, null: false
      add :email, :string
      add :provider_id, :string, null: false
      add :uid, :string, null: false
      add :photo_url, :string

      timestamps()
    end
    create index(:users, [:provider_id, :uid], unique: true)
    create index(:email, unique: true)
  end
end
