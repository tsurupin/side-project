use Mix.Config

port =  System.get_env("PORT") |> String.to_integer()
config :api, ApiWeb.Endpoint,
  load_from_system_env: true,
  http: [port: port],
  url: [host: System.get_env("HOST"), port: port],
  server: true,
  root: ".",
  version: Application.spec(:backend, :vsn),
  secret_key_base: System.get_env("PHOENIX_SECRET_KEY_BASE")


