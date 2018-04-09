defmodule ApiWeb.Schema.Queries.Skills do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers

  object :skills_queries do
    @desc "seach skills"
    field :skills, list_of(:skill) do
      arg(:term, non_null(:string))
      resolve(&Resolvers.Skills.search/3)
    end
  end
end
