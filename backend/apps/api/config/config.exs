# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :api, namespace: Api

config :api, ecto_repos: [Db.Repo]

# Configure phoenix generators
config :phoenix, :generators, migration: false
# Configures the endpoint
config :api, ApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "bLpP0NF/xthZwGyfBHPmXUKzZb5iG5M8SmD0Q90+0AMHtB9Y8JuAIzC4aU+JOf1p",
  render_errors: [view: ApiWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Api.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :api, Api.Guardian,
  allowed_algos: ["RS256"],
  verify_module: Api.Guardian.JWT,
  issuer: System.get_env("FIREBASE_SERVICE_ACCOUNT_EMAIL"),
  ttl: {1, :hours},
  secret_key: {Api.Guardian.FirebaseKey, :get_key, [:secret]}

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
