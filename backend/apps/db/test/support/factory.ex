defmodule Db.Factory do
  @moduledoc """
  Factory functions to use in tests.
  """

  use ExMachina.Ecto, repo: Db.Repo

  alias Db.{
    Repo,
    Users,
    Projects,
    Skills,
    Countries,
    OccupationTypes.OccupationType,
    Genres,
    Chats
  }


  alias Countries.Country
  alias Genres.Genre
  alias Users.User

  @spec occupation_type_factory :: OccupationType.t()
  def occupation_type_factory do
     %OccupationType{
       name: sequence(:name, &"name:#{&1}")
     }
  end

  @spec country_factory :: Country.t()
  def country_factory() do
    %Country{
      name: sequence(:name, &("country:#{&1}"))
    }
  end

  @spec genre_factory :: Genre.t()
  def genre_factory() do
    %Genre{
      name: sequence(:name, &("genre:#{&1}"))
    }
  end



  @doc """
  User factory.
  """
  @spec user_factory :: Users.User.t()
  def user_factory do
    %Users.User{
      uid: "uid2",
      provider_id: "facebook",
      display_name: "user",
      email: "user@gmail.com",
      occupation: "software engineer",
      company_name: "GoBay",
      school_name: "Stonford",
      status: 1,
      latitude: 37.772640,
      longitude: -122.409915,
      area_name: "San Francisco",
      occupation_type: build(:occupation_type),
      country: build(:country),
      genre: build(:genre)
    }
  end
end
