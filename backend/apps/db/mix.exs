defmodule Db.MixProject do
  use Mix.Project

  def project do
    [
      app: :db,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.6",
      start_permanent: Mix.env() == :prod,
      elixirc_paths: elixirc_paths(Mix.env()),
      deps: deps(),
      aliases: aliases(),
      test_coverage: [tool: ExCoveralls]
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :postgrex, :rollbax, :timex],
      mod: {Db.Application, []}
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib", "priv/tasks"]
  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:postgrex, "~> 0.13.0"},
      {:ecto, "~> 2.1.1"},
      {:ecto_enum, "~> 1.0"},
      {:arc, "~> 0.11.0"},
      {:arc_ecto, "~> 0.11.0"},
      {:ex_aws, "~> 2.0"},
      {:ex_aws_ec2, "~> 2.0"},
      {:poison, "~> 3.1"},
      {:geo, "~> 2.0"},
      {:geo_postgis, "~> 1.1.0"},
      {:ex_machina, "~> 2.2", only: [:test]},
      {:timex, "~> 3.1"},
      {:faker, "~> 0.9.0", only: [:test]},
      {:sweet_xml, "~> 0.6.5"},
      {:dialyxir, "~> 0.5.1", only: [:dev], runtime: false},
      {:libcluster, "~> 3.0"},
      {:stream_data, "~> 0.1", only: :test},
      {:rollbax, ">= 0.0.0"}
    ]
  end

  defp aliases do
    [
      "ecto.setup": [
        "ecto.drop",
        "ecto.create",
        "ecto.migrate",
        "run priv/repo/seeds.exs"
      ]
      # test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
