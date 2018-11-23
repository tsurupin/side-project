use Mix.Config

config :logger, :console, format: "[$level] $message\n"

config :db, Db.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "side_project_dev",
  username: System.get_env("POSTGRES_USER"),
  hostname: "localhost",
  pool_size: 10,
  types: Db.PostgresTypes

config :arc, storage: Arc.Storage.Local
