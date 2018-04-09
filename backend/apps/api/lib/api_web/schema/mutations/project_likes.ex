defmodule ApiWeb.Schema.Mutations.ProjectLikes do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  object :project_likes_mutations do
    @desc "give like to project"
    field :like_project, :chat do
      arg(:project_id, non_null(:integer))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.ProjectLikes.like/3)
    end

    @desc "withdraw given like"
    field :withdraw_project_like, :boolean do
      arg(:project_id, non_null(:integer))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.ProjectLikes.withdraw_like/3)
    end
  end
end
