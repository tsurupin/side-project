use Mix.Config

config :logger, :console, format: "[$level] $message\n"

config :db, Db.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "side_project_dev",
  username: System.get_env("DB_USER_NAME"),
  hostname: "localhost",
  pool_size: 10
