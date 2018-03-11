defmodule Db.Repo.Migrations.CreateInitialTables do
  use Ecto.Migration

  def change do

    create table(:genres) do
      add :name, :string, null: false
      timestamps()
    end

    create unique_index(:genres, [:name])


    create table(:countries) do
      add :name, :string, null: false
      timestamps()
    end

    create unique_index(:countries, [:name])

    create table(:occupation_types) do
      add :name, :string, null: false
      timestamps()
    end

    create unique_index(:occupation_types, [:name])


    create table(:skills) do
      add :name, :string, null: false
      timestamps()
    end

    create unique_index(:skills, [:name])


    create table(:users) do
      add :provider_id, :string, null: false
      add :uid, :string, null: false
      add :display_name, :string
      add :email, :string
      add :genre_id, references(:genres)
      add :occupation_type_id, references(:occupation_types)
      add :occupation, :string
      add :company_name, :string
      add :school_name, :string
      add :status, :integer, default: 0, null: false, comment: "0: not_completed, 1: completed, 2: unactive"
      add :last_activated_at, :datetime, default: fragment("now()"), null: false
      add :area_name, :string
      add :country_id, references(:countries)
      add :latitude, :float
      add :longitude, :float

      add :deleted_at, :datetime
      timestamps()
    end

    create constraint(:users, "valid_user_status", check: "status = 0 OR (status = 1 AND display_name IS NOT NULL and occupation_type_id IS NOT NULL AND longitude IS NOT NULL AND latitude IS NOT NULL)")

    create unique_index(:users, [:provider_id, :uid])
    create unique_index(:users, [:email])
    create index(:users, [:country_id])


    create table(:user_photos, comment: "always main photo is displayed first and the others are displayed in recent order") do
      add :user_id, references(:users), null: false
      add :image_url, :string, null: false
      add :is_main, :boolean, null: false, default: false

      timestamps()
    end
    create unique_index(:user_photos, [:user_id, :is_main], where: "is_main = true")

    create table(:user_skills) do
      add :skill_id, references(:skills), null: false
      add :user_id, references(:users), null: false
      add :rank, :integer, null: false, default: 0, comment: "ASC display order"
      timestamps()
    end
    create unique_index(:user_skills, [:skill_id, :user_id])
    create unique_index(:user_skills, [:user_id, :rank])

    create table(:projects) do
      add :name, :string
      add :status, :integer, default: 0, null: false, comment: "0: editing, 1: completed"
      add :genre_id, references(:genres)
      add :lead_sentence, :text
      add :motivation, :text
      add :requirement, :text
      add :owner_id, references(:users), null: false
      timestamps()
    end

    create unique_index(:projects, [:owner_id, :name])
    create constraint(:projects, "valid project constraints", check: "(status = 0) OR (status = 1 AND name IS NOT NULL)")


    create table(:user_projects) do
      add :user_id, references(:users), null: false
      add :project_id, references(:projects), null: false
      add :status, :integer, default: 0, null: false, comment: "0: requested, 1: approved, 2: rejected, 3: withdrawed"
      add :deleted_at, :datetime
      timestamps()
    end

    create unique_index(:user_projects, [:user_id, :project_id])


    create table(:user_interests) do
       add :source_user_id, references(:users), null: false
       add :target_user_id, references(:users), null: false
       add :status, :integer, default: 0, null: false, comment: "0: requested, 1: approved, 2: rejected, 3: withdrawed"
       add :deleted_at, :datetime
       timestamps()
    end

    create unique_index(:user_interests, [:source_user_id, :target_user_id])

    create table(:chats) do
      add :type, :integer
      add :deleted_at, :datetime
      timestamps()
    end

    create table(:chat_contents) do
      add :chat_id, references(:chats), null: false
      add :source_id, :integer, null: false
      add :source_type, :string, null: false
      add :message, :text
      add :image_url, :string
      add :deleted_at, :datetime
      timestamps()
    end
    create unique_index(:chat_contents, [:chat_id, :source_id, :source_type])
    create constraint(:chat_contents, "valid chat contents", check: "message IS NOT NULL OR image_url IS NOT NULL")

    create table(:chat_users) do
      add :user_id, references(:users), null: false
      add :chat_id, references(:chats), null: false
      add :deleted_at, :datetime
      timestamps()
    end
    create unique_index(:chat_users, [:user_id, :chat_id])



    create table(:chat_projects) do
      add :project_id, references(:projects), null: false
      add :chat_id, references(:chats), null: false
      add :deleted_at, :datetime
      timestamps()
    end

    create unique_index(:chat_projects, [:project_id, :chat_id])


    create table(:user_favorites) do
      add :user_id, references(:users), null: false
      add :target_id, :integer, null: false
      add :target_type, :string, null: false
      add :deleted_at, :datetime
      timestamps()
    end

    create unique_index(:user_favorites, [:user_id, :target_id, :target_type])


  end
end
