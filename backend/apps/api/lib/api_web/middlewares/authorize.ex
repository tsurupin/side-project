defmodule ApiWeb.Schema.Middleware.Authorize do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    case resolution.context do
      %{current_user: _current_user} ->
        resolution

      %{error: :token_expired} ->

        resolution
        |> Absinthe.Resolution.put_result({:error, "token expired"})

      _ ->

        resolution
        |> Absinthe.Resolution.put_result({:error, "unauthorized"})
    end
  end
end
