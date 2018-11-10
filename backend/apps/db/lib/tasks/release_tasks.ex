defmodule Db.Tasks.ReleaseTasks do
  @start_apps [
    :postgrex,
    :ecto
  ]

  @app_name :db

  def setup do
    boot(@app_name)
    Db.Repo.__adapter__().storage_up(Db.Repo.config())
    {:ok, _} = Db.Repo.start_link(pool_size: 1)
    run_migrations_for(@app_name)
    # run_seeds_for(:db)
  end

  def migrate do
    boot(:db)
    {:ok, _} = Db.Repo.start_link(pool_size: 1)
    run_migrations_for(@app_name)
  end

  defp boot(app) do
    IO.puts("Booting pre hook...")
    # Load app without starting it

    case Application.load(app) do
      :ok -> IO.puts("Loaded")
      {:error, {reason, _app}} -> IO.puts("errors:#{reason}")
    end

    # Ensure postgrex and ecto for migrations and seed
    Enum.each(@start_apps, &Application.ensure_all_started/1)
  end

  defp run_migrations_for(app) do
    IO.puts("Running migrations...")
    Ecto.Migrator.run(Db.Repo, migrations_path(app), :up, all: true)
  end

  defp run_seeds_for(app) do
    # Run the seed script if it exists
    seed_script = Path.join([priv_dir(app), "repo", "seeds.exs"])

    if File.exists?(seed_script) do
      IO.puts("Running seed script...")
      Code.eval_file(seed_script)
    end
  end

  defp migrations_path(app), do: Path.join([priv_dir(app), "repo", "migrations"])

  defp seed_path(app), do: Path.join([priv_dir(app), "repo", "seeds.exs"])

  defp priv_dir(app), do: "#{:code.priv_dir(app)}"
end
