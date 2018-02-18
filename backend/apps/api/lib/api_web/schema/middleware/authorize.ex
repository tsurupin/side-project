#---
# Excerpted from "Craft GraphQL APIs in Elixir with Absinthe",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/wwgraphql for more book information.
#---
defmodule ApiWeb.Schema.Middleware.Authorize do
  @behaviour Absinthe.Middleware

  def call(resolution, role) do
    case resolution.context do
      %{current_user: current_user} ->
        resolution
      %{expired: True} ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "expired"})
      _ ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "unauthorized"})
    end
  end

  defp correct_role?(%{}, :any), do: true
  defp correct_role?(%{role: role}, role), do: true
  defp correct_role?(_, _), do: false
end
