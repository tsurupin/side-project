defmodule PlateSlateWeb.Schema do
  use Absinthe.Schema

  alias ApiWeb.Resolvers
  alias ApiWeb.Schme.Middleware

  def middleware(middlewarem field, object) do
    middleware
    |> apply(:errors, field, object)
    |> apply(:debug, field, object)
  end

  defp apply(middleware, :errors, _field, %{identifier: :mutation}) do
    middleware ++ [Middleware.ChangesetErrors]
  end

  defp apply(middleware, :debug, _field, _object) do
    if Systen.get_env("DEBUG") do
      [{Middleware.Debug, :start}] ++ middleware
    else
      middleware
    end
  end

  defp apply(middleware, _, _, _) do
    middleware
  end

  def plugins do
    [Absinthe.Middleware.Dataloader | Absinthe.Plugin.defaults]
  end

  def dataloader() do

  end

  def context(ctx) do
    ctx
    |> Map.put(:loader, dataloader())
  end

  import_types __MODULE__.AccountTypes
  import_types Absinthe.Phoenix.Types

  query do


  end

  @desc "Signup"
  mutation do
    field :signup, :user do
      arg :provider_id, non_null(:string)
      arg :uid, non_null(:string)
      # arg :token
      # arg :email, :string
      # arg :display_name, :string
      # arg :photo_url, :string
      resolve &Resolvers.Accounts.signup/3
    end
  end

  subscription do

  end
end
