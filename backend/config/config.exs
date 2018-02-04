# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

# By default, the umbrella project as well as each child
# application will require this configuration file, ensuring
# they all use the same configuration. While one could
# configure all applications here, we prefer to delegate
# back to each application for organization purposes.
import_config "../apps/*/config/config.exs"

# Sample configuration (overrides the imported configuration above):
#
#     config :logger, :console,
#       level: :info,
#       format: "$date $time [$level] $metadata$message\n",
#       metadata: [:user_id]

# {:phoenix, "~> 1.3.0"},
#       {:phoenix_pubsub, "~> 1.0"},
#       {:phoenix_ecto, "~> 3.2"},
#       {:postgrex, ">= 0.0.0"},
#       {:phoenix_html, "~> 2.10"},
#       {:phoenix_live_reload, "~> 1.0", only: :dev},
#       {:gettext, "~> 0.11"},
#       {:cowboy, "~> 1.0"},
#       {:absinthe, "~> 1.4.7"},
#       {:absinthe_plug, "~> 1.4.3"},
#       {:absinthe_phoenix, "~> 1.4.2"}
#       {:poison, "~> 1.3.0"},
#       {:dataloader, "~> 1.0.0"}
