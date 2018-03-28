defmodule Db.Repo.Migrations.CreateInitialTables do
  use Ecto.Migration

  def change do



    create table(:genres) do
      add :name, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:genres, [:name], name: "genres_name_index")


    create table(:countries) do
      add :name, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:countries, [:name], name: "countries_name_index")

    create table(:occupation_types) do
      add :name, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:occupation_types, [:name], name: "occupation_types_name_index")


    create table(:skills) do
      add :name, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:skills, [:name], name: "skills_name_index")


    create table(:users) do
      add :provider_id, :string, null: false
      add :uid, :string, null: false
      add :display_name, :string
      add :introduction, :string
      add :email, :string
      add :genre_id, references(:genres)
      add :occupation_type_id, references(:occupation_types)
      add :occupation, :string
      add :company_name, :string
      add :school_name, :string
      add :status, :integer, default: 0, null: false, comment: "0: not_completed, 1: completed, 2: unactive"
      add :last_activated_at, :utc_datetime, default: fragment("now()"), null: false
      add :area_name, :string
      add :country_id, references(:countries)
      add :geom, :geometry

      timestamps()
    end

    create constraint(:users, "valid_user_status", check: "status = 0 OR (status = 1 AND display_name IS NOT NULL and occupation_type_id IS NOT NULL AND longitude IS NOT NULL AND latitude IS NOT NULL)")

    create unique_index(:users, [:provider_id, :uid], name: "users_provider_id_and_uid_index")
    create unique_index(:users, [:email], name: "users_name_index")
    create index(:users, [:country_id])


    create table(:user_photos, comment: "always main photo is displayed first and the others are displayed in recent order") do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :image_url, :string, null: false
      add :is_main, :boolean, null: false, default: false

      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:user_photos, [:user_id, :is_main], where: "is_main = true", name: "user_photos_user_id_and_is_main_index")

    create table(:user_skills) do
      add :skill_id, references(:skills, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :rank, :integer, null: false, default: 0, comment: "ASC display order"
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:user_skills, [:skill_id, :user_id], name: "user_skills_skill_id_and_user_id_index")
    create unique_index(:user_skills, [:user_id, :rank], name: "user_skills_user_id_and_rank_index")

    create table(:user_likes) do
       add :user_id, references(:users, on_delete: :delete_all), null: false
       add :target_user_id, references(:users, on_delete: :delete_all), null: false
       add :status, :integer, default: 0, null: false, comment: "0: requested, 1: approved, 2: rejected, 3: withdrawed"
       add :deleted_at, :utc_datetime
       timestamps()
    end

    create unique_index(:user_likes, [:user_id, :target_user_id], name: "user_likes_unique_index")

    create table(:projects) do
      add :name, :string
      add :status, :integer, default: 0, null: false, comment: "0: editing, 1: completed"
      add :genre_id, references(:genres)
      add :lead_sentence, :text
      add :motivation, :text
      add :requirement, :text
      add :owner_id, references(:users), null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:projects, [:owner_id, :name], name: "projects_owner_id_and_name_index")
    create constraint(:projects, "valid_project_status", check: "(status = 0) OR (status = 1 AND name IS NOT NULL)")

    create table(:user_favorites) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :target_user_id, references(:users, on_delete: :delete_all)
      add :target_project_id, references(:projects, on_delete: :delete_all)

      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:user_favorites, [:user_id, :target_user_id, :target_project_id], name: "user_favorites_unique_index")

    create table(:project_skills) do
      add :skill_id, references(:skills, on_delete: :delete_all), null: false
      add :project_id, references(:projects, on_delete: :delete_all), null: false
      add :rank, :integer, null: false, default: 0, comment: "ASC display order"
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:project_skills, [:skill_id, :project_id], name: "project_skills_skill_id_and_project_id_index")
    create unique_index(:project_skills, [:project_id, :rank], name: "project_skills_project_id_and_rank_index")

    create table(:project_photos, comment: "always main photo is displayed first and the others are displayed in recent order") do
      add :project_id, references(:projects, on_delete: :delete_all), null: false
      add :image_url, :string, null: false
      add :is_main, :boolean, null: false, default: false
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:project_photos, [:project_id, :is_main], where: "is_main = true", name: "project_photos_user_id_and_is_main_index")


    create table(:project_members) do
      add :project_id, references(:projects, on_delete: :delete_all), null: false
      add :user_id, references(:users), null: false
      add :status, :integer, default: 0, null: false, comment: "0: requested, 1: approved, 2: rejected, 3: withdrawed"
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:project_members, [:project_id, :user_id], name: "project_members_project_id_and_user_id_index")

    create table(:chat_groups) do
      add :source_id, :integer, null: false
      add :source_type, :string, null: false, comment: "source is either Project or UserLike"
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:chat_groups, [:source_id, :source_type], name: "chat_groups_source_id_and_source_type_index")

    create table(:chats) do
      add :chat_group_id, references(:chat_groups, on_delete: :delete_all), null: false
      add :name, :string, null: false
      add :is_main, :boolean, default: false, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:chats, [:chat_group_id, :is_main], where: "is_main = true", name: "chats_chat_group_id_and_is_main_index")
    create unique_index(:chats, [:chat_group_id, :name], name: "chats_chat_group_id_and_name_index")


    create table(:chat_contents) do
      add :chat_id, references(:chats, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :message, :text
      add :image_url, :string
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create constraint(:chat_contents, "valid_chat_content", check: "message IS NOT NULL OR image_url IS NOT NULL")

    create table(:chat_members) do
      add :chat_id, references(:chats, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:chat_members, [:chat_id, :user_id], name: "chat_members_chat_id_and_user_id_index")

    execute("SELECT AddGeometryColumn ('users','lng_lat_point',4326,'POINT',2);")
    execute "CREATE EXTENSION IF NOT EXISTS postgis"


  end
end
