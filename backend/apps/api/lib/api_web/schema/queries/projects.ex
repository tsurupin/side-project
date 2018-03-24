defmodule ApiWeb.Schema.Queries.Projects do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers

  object :projects_queries do
    @desc "Fetch project info"
    field :project, :project do
      arg :id, :id
      resolve &Resolvers.Projects.fetch_profile/3
    end
  end

end
