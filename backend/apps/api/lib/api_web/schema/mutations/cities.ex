defmodule ApiWeb.Schema.Mutations.Cities do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  object :cities_mutations do
    @desc "Find or create city"
    field :find_or_create, :city do
      arg(:city_input, non_null(:city_input))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Cities.find_or_create/3)
    end
  end
end
