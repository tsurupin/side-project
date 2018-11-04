use Mix.Config

config :db, Db.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "side_project_test",
  username: "postgres",
  hostname: "localhost",
  types: Db.PostgresTypes,
  pool: Ecto.Adapters.SQL.Sandbox

config :logger,
  backends: [:console],
  compile_time_purge_level: :debug

config :arc, storage: Arc.Storage.Local
