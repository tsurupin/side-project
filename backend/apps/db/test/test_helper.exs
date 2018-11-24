ExUnit.start()
Ecto.Adapters.SQL.Sandbox.mode(Db.Repo, :manual)
{:ok, _apps} = Application.ensure_all_started(:ex_machina)
