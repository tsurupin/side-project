use Mix.Config

config :db, Db.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "side_project_dev",
  username: "tomoakitsuruta",
  hostname: "localhost",
  pool_size: 10
