defmodule ApiWeb.Schema.Resolvers.Cities do
  alias Db.Locations.Cities

  def search(_parent, attrs, _resolver) do
    cities = Cities.search(attrs)

    {:ok, cities}
  end

  def find_or_create(
        _parent,
        %{
          city_input: %{
            name: name,
            state_name: state_name,
            state_abbreviation: state_abbreviation,
            country_name: country_name
          }
        },
        _resolver
      ) do
    case Cities.get_by(%{name: name, state_name: state_name, country_name: country_name}) do
      {:ok, city} ->
        {:ok, city}

      {:error, :country_not_found} ->
        {:error, "Country was not found"}

      {:error, country, :not_found} ->
        case Cities.create(%{
               name: name,
               state_name: state_name,
               state_abbreviation: state_abbreviation,
               country_id: country.id
             }) do
          {:ok, city} -> {:ok, city}
          {:error, reason} -> {:error, reason}
        end
    end
  end
end
