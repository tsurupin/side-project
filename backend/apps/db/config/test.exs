use Mix.Config

config :db, Db.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "side_project_test",
  username: System.get_env("DB_USER_NAME"),
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

config :logger,
  backends: [:console],
  compile_time_purge_level: :debug
