defmodule ApiWeb.Schema.Mutations.Skills do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  object :skills_mutations do
    @desc "create a new skill"
    field :create_skill, :skill do
      arg(:name, non_null(:string))
      #middleware(Middleware.Authorize)
      resolve(&Resolvers.Skills.create/3)
    end
  end
end
