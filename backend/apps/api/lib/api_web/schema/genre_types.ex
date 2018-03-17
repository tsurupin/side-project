defmodule ApiWeb.Schema.GenreTypes do
  use Absinthe.Schema.Notation

  object :genre do
    field :id, :id
    field :name, :string
  end
end
