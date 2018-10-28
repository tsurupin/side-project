use Mix.Config

config :db, Db.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "side_project_production",
  username: System.get_env("DB_USER_NAME"),
  password: System.get_env("DB_PASSWORD"),
  types: Db.PostgresTypes,
  pool_size: Sysem.get_env("POOL_SIZE") || 10,
  ssl: false


# config :arc, storage: Arc.Storage.S3, bucket: {:system, "AWS_S3_BUCKET"}
# config :ex_aws,
#   access_key_id: [{:system, "S3_KEY"}, :instance_role],
#   secret_access_key: [{:system, "S3_SECRET"}, :instance_role],
#   region: {:system, "S3_REGION"}
