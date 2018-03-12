defmodule ApiWeb.Schema.Middleware.Authorize do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    IO.inspect(resolution.context)

    case resolution.context do
      %{current_user: _current_user} ->
        IO.inspect("matching")
        resolution

      %{error: :token_expired} ->
        IO.inspect("token expired")

        resolution
        |> Absinthe.Resolution.put_result({:error, "token expired"})

      _ ->
        IO.inspect("unauthorized")

        resolution
        |> Absinthe.Resolution.put_result({:error, "unauthorized"})
    end
  end
end
