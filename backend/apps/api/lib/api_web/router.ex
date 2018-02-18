defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    #plug Api.Guardian.AuthAccessPipeline
    plug ApiWeb.Context
  end

  pipeline :graphql do
    plug :accepts, ["json"]
  end


  scope "/api" do
    pipe_through :api # Use the default browser stack

    # forward "/api", Absinthe.Plug,
    #   schema: ApiWeb.Schema

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      socket: ApiWeb.UserSocket,
      schema: ApiWeb.Schema
  end

  # scope "/graphq" do
  #   pipe_through :graphq # Use the default browser stack
  #
  #   # forward "/api", Absinthe.Plug,
  #   #   schema: ApiWeb.Schema
  #
  #   forward "/graphiql", Absinthe.Plug.GraphiQL,
  #     socket: ApiWeb.UserSocket,
  #     schema: ApiWeb.Schema
  # end

  # Other scopes may use custom stacks.
  # scope "/api", ApiWeb do
  #   pipe_through :api
  # end
end
