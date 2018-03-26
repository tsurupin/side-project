defmodule ApiWeb.Schema.Queries.Favorites do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers
  alias ApiWeb.Schema.Middleware

  object :favorites_queries do
    @desc "Fetch favorite list"
    field :favorite_list, list_of(:favorite) do
      middleware Middleware.Authorize
      resolve &Resolvers.Favorites.fetch/3
    end
  end

end
