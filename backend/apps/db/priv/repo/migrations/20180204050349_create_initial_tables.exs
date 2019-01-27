defmodule Db.Repo.Migrations.CreateInitialTables do
  use Ecto.Migration

  def change do

    execute "CREATE EXTENSION IF NOT EXISTS postgis"

    create table(:genres) do
      add :name, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:genres, [:name], name: "genres_name_index", where: "deleted_at IS NULL")

    execute(
      "CREATE VIEW alive_genres AS SELECT id, name, inserted_at, updated_at, deleted_at from genres WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_genres;"
    )
    create table(:countries) do
      add :name, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:countries, [:name], name: "countries_name_index", where: "deleted_at IS NULL")
    create index(:countries, [:deleted_at])

    create table(:cities) do
      add :country_id, references(:countries), null: false
      add :name, :string, null: false
      add :state_name, :string, null: false
      add :state_abbreviation, :string

      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:cities, [:name, :state_name, :country_id], name: "cities_name_and_state_name_and_country_id_index", where: "deleted_at IS NULL")


    create table(:zip_codes) do
      add :zip_code, :string, null: false
      add :city_id, references(:cities)
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:zip_codes, [:zip_code], name: "zip_codes_code_index", where: "deleted_at IS NULL")

    create table(:occupation_types) do
      add :name, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:occupation_types, [:name], name: "occupation_types_name_index", where: "deleted_at IS NULL")
    execute(
      "CREATE VIEW alive_occupation_types AS SELECT id, name, inserted_at, updated_at, deleted_at from occupation_types WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_occupation_types;"
    )

    create table(:skills) do
      add :name, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:skills, [:name], name: "skills_name_index", where: "deleted_at IS NULL")
    execute(
      "CREATE VIEW alive_skills AS SELECT id, name, inserted_at, updated_at, deleted_at from skills WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_skills;"
    )

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
      add :zip_code, :string
      add :city_id, references(:cities)

      timestamps()
    end

    execute("SELECT AddGeometryColumn ('users','geom',4326,'POINT',2);")

    create constraint(:users, "valid_user_status", check: "status = 0 OR (status = 1 AND display_name IS NOT NULL and occupation_type_id IS NOT NULL AND geom IS NOT NULL)")

    create unique_index(:users, [:provider_id, :uid], name: "users_provider_id_and_uid_index")
    create unique_index(:users, [:email], name: "users_email_index")
    create index(:users, [:city_id])
    create index(:users, [:geom], using: "gist")


    create table(:user_photos, comment: "always main photo is displayed first and the others are displayed in recent order") do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :image_url, :string, null: false
      add :rank, :integer, null: false, default: 0
      add :uuid, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:user_photos, [:user_id, :rank], name: "user_photos_user_id_and_rank_index", where: "deleted_at IS NULL")
    create constraint(:user_photos, "valid_user_photo_rank", check: "rank >= 0 ")

    execute(
      "CREATE VIEW alive_user_photos AS SELECT id, user_id, image_url, rank, uuid, inserted_at, updated_at, deleted_at from user_photos WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_user_photos;"
    )

    create table(:user_skills) do
      add :skill_id, references(:skills, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :rank, :integer, null: false, comment: "ASC display order"
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:user_skills, [:skill_id, :user_id], name: "user_skills_skill_id_and_user_id_index", where: "deleted_at IS NULL")
    #create unique_index(:user_skills, [:user_id, :rank], name: "user_skills_user_id_and_rank_index")

    execute(
      "CREATE VIEW alive_user_skills AS SELECT id, skill_id, user_id, rank, inserted_at, updated_at from user_skills WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_user_skills;"
    )

    create table(:user_likes) do
       add :user_id, references(:users, on_delete: :delete_all), null: false
       add :target_user_id, references(:users, on_delete: :delete_all), null: false
       add :status, :integer, default: 0, null: false, comment: "0: requested, 1: approved, 2: rejected, 3: withdrawed"
       add :deleted_at, :utc_datetime
       timestamps()
    end

    create unique_index(:user_likes, [:user_id, :target_user_id], name: "user_likes_unique_index", where: "deleted_at IS NULL")

    execute(
      "CREATE VIEW alive_user_likes AS SELECT id, user_id, target_user_id, status, inserted_at, updated_at, deleted_at from user_likes WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_user_likes;"
    )

    create table(:projects) do
      add :title, :string, null: false, default: ""
      add :status, :integer, default: 0, null: false, comment: "0: editing, 1: completed, 2: inactive"
      add :genre_id, references(:genres)
      add :lead_sentence, :text
      add :motivation, :text
      add :requirement, :text
      add :zip_code, :string
      add :city_id, references(:cities)
      add :owner_id, references(:users), null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:projects, [:owner_id, :title], name: "projects_owner_id_and_title_index",  where: "deleted_at IS NULL")
    create constraint(:projects, "valid_project_status", check: "(status != 1) OR (status = 1 AND lead_sentence IS NOT NULL)")


    execute(
      "CREATE VIEW alive_projects AS SELECT id, title, status, genre_id, lead_sentence, motivation, requirement, zip_code, city_id, owner_id, inserted_at, updated_at, deleted_at from projects WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_projects;"
    )


    create table(:project_likes) do
       add :user_id, references(:users, on_delete: :delete_all), null: false
       add :project_id, references(:projects, on_delete: :delete_all), null: false
       add :status, :integer, default: 0, null: false, comment: "0: requested, 1: approved, 2: rejected, 3: withdrawed"
       add :deleted_at, :utc_datetime
       timestamps()
    end

    create unique_index(:project_likes, [:user_id, :project_id], name: "project_likes_unique_index", where: "deleted_at IS NULL")

    execute(
      "CREATE VIEW alive_project_likes AS SELECT id, user_id, project_id, status, inserted_at, updated_at, deleted_at from project_likes WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_project_likes;"
    )

    create table(:project_skills) do
      add :skill_id, references(:skills, on_delete: :delete_all), null: false
      add :project_id, references(:projects, on_delete: :delete_all), null: false
      add :rank, :integer, null: false, comment: "ASC display order"
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:project_skills, [:skill_id, :project_id], name: "project_skills_skill_id_and_project_id_index",where: "deleted_at IS NULL")
    #create unique_index(:project_skills, [:project_id, :rank], name: "project_skills_project_id_and_rank_index")

    execute(
      "CREATE VIEW alive_project_skills AS SELECT id, skill_id, project_id, rank, inserted_at, updated_at, deleted_at from project_skills WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_project_skills;"
    )

    create table(:project_photos, comment: "always main photo is displayed first and the others are displayed in recent order") do
      add :project_id, references(:projects, on_delete: :delete_all), null: false
      add :image_url, :string, null: false
      add :rank, :integer, null: false
      add :uuid, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:project_photos, [:project_id, :rank], name: "project_photos_project_id_and_rank_index", where: "deleted_at IS NULL")
    create constraint(:project_photos, "valid_project_photo_rank", check: "rank >= 0 ")

    execute(
      "CREATE VIEW alive_project_photos AS SELECT id, project_id, image_url, rank, uuid, inserted_at, updated_at, deleted_at from project_photos WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_project_photos;"
    )


    create table(:project_members) do
      add :project_id, references(:projects, on_delete: :delete_all), null: false
      add :user_id, references(:users), null: false
      add :status, :integer, default: 0, null: false, comment: "0: requested, 1: approved, 2: rejected, 3: withdrawed"
      add :role, :integer, default: 0, null: false, comment: "0: user, 1: admin, 3: master"
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create unique_index(:project_members, [:project_id, :user_id], name: "project_members_project_id_and_user_id_index", where: "deleted_at IS NULL")

    execute(
      "CREATE VIEW alive_project_members AS SELECT id, project_id, user_id, status, inserted_at, updated_at, deleted_at from project_members WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_project_members;"
    )


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
    create unique_index(:chats, [:chat_group_id, :is_main], where: "is_main = true and deleted_at is NULL", name: "chats_chat_group_id_and_is_main_index")
    create unique_index(:chats, [:chat_group_id, :name], name: "chats_chat_group_id_and_name_index", where: "deleted_at IS NULL")

    execute(
      "CREATE VIEW alive_chats AS SELECT id, name, is_main, inserted_at, updated_at, deleted_at from chats WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_chats;"
    )
    create table(:chat_messages) do
      add :chat_id, references(:chats, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :comment, :text
      add :image_url, :string
      add :message_type, :integer, null: false, comment: "0: comment, 1: upload"
      add :uuid, :string, null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end

    create constraint(:chat_messages, "valid_chat_message", check: "comment IS NOT NULL OR image_url IS NOT NULL")

    execute(
      "CREATE VIEW alive_chat_messages AS SELECT id, chat_id, user_id, comment, image_url, message_type, uuid, inserted_at, updated_at, deleted_at from chat_messages WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_chat_messages;"
    )

    create table(:chat_members) do
      add :chat_id, references(:chats, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :deleted_at, :utc_datetime
      timestamps()
    end
    create unique_index(:chat_members, [:chat_id, :user_id], name: "chat_members_chat_id_and_user_id_index", where: "deleted_at IS NULL")

    execute(
      "CREATE VIEW alive_chat_members AS SELECT id, chat_id, user_id, inserted_at, updated_at, deleted_at from chat_members WHERE deleted_at IS NULL;",
      "DROP VIEW IF EXISTS alive_chat_members;"
    )
  end
end
