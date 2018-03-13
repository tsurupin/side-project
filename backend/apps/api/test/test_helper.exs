ExUnit.start()

{:ok, _apps} = Application.ensure_all_started(:ex_machina)

ExUnit.start()

Ecto.Adapters.SQL.Sandbox.mode(Db.Repo, :manual)

Absinthe.Test.prime(ApiWeb.Schema)
