echo "Running setup"
# Runs ecto.create, ecto.migrate and ecto.seed
bin/subs command Elixir.Db.Tasks.ReleaseTasks setup
echo "Setup run successfully"