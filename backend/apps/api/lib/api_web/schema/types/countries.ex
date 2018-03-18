defmodule ApiWeb.Schema.Types.Countries do
  use Absinthe.Schema.Notation

  object :country do
    field :id, :id
    field :name, :string
  end
end
