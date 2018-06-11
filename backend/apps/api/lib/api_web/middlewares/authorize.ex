defmodule ApiWeb.Schema.Middleware.Authorize do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    case resolution.context do
      %{current_user: _current_user} ->
        IO.inspect("user is here")
        resolution

      %{error: :token_expired} ->
        IO.inspect("token expired")

        resolution
        |> Absinthe.Resolution.put_result({:error, "token expired"})

      re ->
        IO.inspect(re)

        resolution
        |> Absinthe.Resolution.put_result({:error, "unauthorized"})
    end
  end
end
