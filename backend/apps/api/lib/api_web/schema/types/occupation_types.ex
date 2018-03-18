defmodule ApiWeb.Schema.Types.OccupationTypes do
  use Absinthe.Schema.Notation

  object :occupation_type do
    field :id, :id
    field :name, :string
  end
end
