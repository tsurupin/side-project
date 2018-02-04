use Mix.Config

config :db, Db.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "side_project_production",
  username: System.get_env("DB_USER"),
  password: System.get_env("DB_PASSWORD")
