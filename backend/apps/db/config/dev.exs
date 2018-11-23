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

config :ex_aws,
  access_key_id: [System.get_env("AWS_ACCESS_KEY_ID"), :instance_role],
  secret_access_key: [System.get_env("AWS_SECRET_ACCESS_KEY"), :instance_role],
  region: System.get_env("AWS_DEFAULT_REGION")
