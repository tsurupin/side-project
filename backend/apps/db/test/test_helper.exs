Ecto.Adapters.SQL.Sandbox.mode(Db.Repo, {:shared, self()})
{:ok, _apps} = Application.ensure_all_started(:ex_machina)

ExUnit.start()

