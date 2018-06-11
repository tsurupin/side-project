defmodule ApiWeb.Schema.Resolvers.Cities do
  alias Db.Locations.Cities

  def search(_parent, attrs, _resolver) do
    cities = Cities.search(attrs)

    {:ok, cities}
  end
end
