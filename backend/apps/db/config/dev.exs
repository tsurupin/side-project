use Mix.Config

config :logger, :console, format: "[$level] $message\n"

config :db, Db.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "side_project_dev",
  username: System.get_env("DB_USER_NAME"),
  hostname: "localhost",
  pool_size: 10

#config :arc, storage: Arc.Storage.Local
# TODO: local storage is not working for umbrella app
config :arc, storage: Arc.Storage.S3, bucket: {:system, "S3_BUCKET"}
config :ex_aws,
  access_key_id: [{:system, "S3_KEY"}, :instance_role],
  secret_access_key: [{:system, "S3_SECRET"}, :instance_role],
  region: {:system, "S3_REGION"}
