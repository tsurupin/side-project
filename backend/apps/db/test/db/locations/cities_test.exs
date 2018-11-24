defmodule Db.CitiesTest do
  use Db.DataCase
  alias Db.Locations.Cities

  describe "search/1" do
    test "returns cities which partially matches to input name" do
      city = Factory.insert(:city, name: "san francisco")

      [san_francisco | _] = Cities.search(%{name: "San franci"})
      assert san_francisco.id == city.id
    end

    # test "returns cities which has input zip_code" do

    # end
  end

  describe "get_by/1" do
    test "returns :country_not_found when country is not found with input" do
      assert {:error, :country_not_found} =
               Cities.get_by(%{
                 name: "San Francisco",
                 state_name: "California",
                 state_abbreviation: "CA",
                 country_name: "USA"
               })
    end

    test "returns :not_found when city is not found with input" do
      country = Factory.insert(:country)

      assert {:error, _country, :not_found} =
               Cities.get_by(%{
                 name: "San Francisco",
                 state_name: "California",
                 state_abbreviation: "CA",
                 country_name: country.name
               })
    end

    test "returns matched city" do
      city = Factory.insert(:city, name: "san francisco")

      assert {:ok, matched_city} =
               Cities.get_by(%{
                 name: city.name,
                 state_name: city.state_name,
                 state_abbreviation: city.state_abbreviation,
                 country_name: city.country.name
               })

      assert matched_city.id == city.id
    end
  end

  describe "create/1" do
    test "succeeds to create a new city" do
      country = Factory.insert(:country)

      inputs = %{
        name: "San Francisco",
        state_name: "California",
        state_abbreviation: "CA",
        country_id: country.id
      }

      assert {:ok, city} = Cities.create(inputs)
      assert city.name == "San Francisco"
    end
  end
end
