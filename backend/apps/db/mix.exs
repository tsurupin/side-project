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
      elixirc_paths: elixirc_paths(Mix.env),
      deps: deps(),
      aliases: aliases()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :postgrex],
      mod: {Db.Application, []}
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_), do: ["lib", "web"]
  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:phoenix, "~> 1.3.0"},
      {:phoenix_ecto, "~> 3.2"},
      {:postgrex, "~> 0.13.0"},
      {:ecto, "~> 2.1.1"},
      {:ecto_enum, "~> 1.0"},
      {:arc, "~> 0.8.0"},
      {:arc_ecto, "~> 0.7.0"},
      {:ex_aws, "~> 1.1.3"},
      {:hackney, "~> 1.8.0", override: true},
      {:poison, "~> 3.1"},
      {:sweet_xml, "~> 0.6"},
      {:ex_machina, "~> 2.1.0", only: [:test]},
      {:timex, "~> 3.1"},

      {:faker, "~> 0.9.0", only: [:test]},
      {:dialyxir, "~> 0.5.1", only: [:dev], runtime: false}
    ]
  end

  defp aliases do
    [
      "ecto.setup": [
        "ecto.drop",
        "ecto.create",
        "ecto.migrate",
        "run priv/repo/seeds.exs"
      ],
      #test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
