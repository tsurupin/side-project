defmodule ApiWeb.Schema.Types.Genres do
  use Absinthe.Schema.Notation

  object :genre do
    field :id, :id
    field :name, :string
  end
end
