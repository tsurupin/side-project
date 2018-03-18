defmodule ApiWeb.Schema.OccupationTypeTypes do
  use Absinthe.Schema.Notation

  object :occupation_type do
    field :id, :id
    field :name, :string
  end
end
