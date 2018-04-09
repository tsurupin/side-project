defmodule ApiWeb.SubscriptionCase do
  @moduledoc """
  This module defines the test case to be used by
  subscription tests
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      alias Db.{
        Factory,
        Repo
      }

      # Import conveniences for testing with channels
      use ApiWeb.ChannelCase
      use Absinthe.Phoenix.SubscriptionTest, schema: ApiWeb.Schema

      # import unquote(__MODULE__), only: [menu_item: 1]
    end
  end

  # # handy function for grabbing a fixture
  # def menu_item(name) do
  #   .Repo.get_by!(PlateSlate.Menu.Item, name: name)
  # end
end
