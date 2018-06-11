defmodule ApiWeb.Schema.Queries.Cities do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  object :cities_queries do
    @desc "seach cities"
    field :city_list, list_of(:city) do
      arg(:name, :string)
      arg(:zip_code, :string)
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Cities.search/3)
    end
  end
end
