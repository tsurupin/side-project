defmodule Api.Mixfile do
  use Mix.Project

  def project do
    [
      app: :api,
      version: "0.0.1",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.7",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      test_coverage: [tool: ExCoveralls]
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Api.Application, [:cachex]},
      extra_applications: [:db, :logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.4.0"},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 4.0", only: :test},
      {:phoenix_live_reload, "~> 1.2.0", only: :dev},
      {:phoenix_html, "~> 2.10"},
      {:db, in_umbrella: true},
      {:gettext, "~> 0.11"},
      {:cowboy, "~> 2.6.1"},
      {:plug_cowboy, "~> 2.0"},
      {:absinthe, "~> 1.4.2"},
      {:absinthe_plug, "~> 1.4.0"},
      {:absinthe_phoenix, "~> 1.4.0"},
      {:guardian, "~> 1.0"},
      {:httpoison, "~> 1.4.0"},
      {:cachex, "~> 3.0"},
      {:briefly, "~> 0.3"},
      {:jason, "~> 1.0"},
      {:dataloader, "~> 1.0.0"},
      {:mock, "~> 0.3.0", only: :test},
      {:stream_data, "~> 0.1", only: :test}
    ]
  end
end
