defmodule ApiWeb.Schema.Queries.Matches do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers
  alias ApiWeb.Schema.Middleware

  object :matches_queries do
    @desc "Fetch match list"
    field :match_list, :match_list do
      middleware Middleware.Authorize
      resolve &Resolvers.Matches.fetch/3
    end
  end

end
