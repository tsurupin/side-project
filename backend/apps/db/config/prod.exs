use Mix.Config

config :db, Db.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "side_project_production",
  url: System.get_env("POSTGRES_DB_URL"),
  types: Db.PostgresTypes,
  pool_size: System.get_env("POSTGRES_POOL_SIZE") || 10,
  ssl: false

config :arc, storage: Arc.Storage.S3, bucket: System.get_env("AWS_S3_BUCKET")

config :ex_aws,
  access_key_id: [System.get_env("AWS_ACCESS_KEY_ID"), :instance_role],
  secret_access_key: [System.get_env("AWS_SECRET_KEY"), :instance_role],
  region: System.get_env("AWS_DEFAULT_REGION")
