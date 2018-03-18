defmodule ApiWeb.Schema.CountryTypes do
  use Absinthe.Schema.Notation

  object :country do
    field :id, :id
    field :name, :string
  end
end
