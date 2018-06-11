defmodule ApiWeb.Schema.Queries.Skills do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  object :skills_queries do
    @desc "seach skills"
    field :skills, list_of(:skill) do
      arg(:name, non_null(:string))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Skills.search/3)
    end
  end
end
