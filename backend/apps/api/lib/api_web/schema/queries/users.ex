defmodule ApiWeb.Schema.Queries.Users do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers
  alias ApiWeb.Schema.Middleware

  object :users_queries do
    @desc "Fetch user info"
    field :user, :user do
      arg :id, :id
      resolve &Resolvers.Users.fetch_profile/3
    end

    @desc "Fetch displayed users info"
    field :users, list_of(:user) do
      arg :conditions, :user_search_conditions
      middleware Middleware.Authorize
      resolve &Resolvers.Users.search/3
    end

  end

end
