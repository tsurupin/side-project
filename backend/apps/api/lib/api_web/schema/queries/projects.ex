defmodule ApiWeb.Schema.Queries.Projects do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers
  alias ApiWeb.Schema.Middleware

  object :projects_queries do
    @desc "Fetch project info"
    field :project, :project do
      arg(:id, :id)
      resolve(&Resolvers.Projects.fetch_profile/3)
    end

    @desc "Search Projects"
    field :projects, list_of(:project) do
      arg(:conditions, :project_search_conditions)
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Projects.search/3)
    end
  end
end
