defmodule ApiWeb.Schema.Mutations.Favorites do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  # object :favorites_mutations do
  #   field :favorite, :boolean do
  #     arg(:favorite_input, :favorite_input)
  #     middleware Middleware.Authorize
  #     resolve(&Resolvers.Favorites.favorite/3)
  #   end
  #
  #   field :unfavorite, :boolean do
  #     arg(:favorite_input, :favorite_input)
  #     middleware Middleware.Authorize
  #     resolve(&Resolvers.Favorites.unfavorite/3)
  #   end
  #
  #
  # end
end
