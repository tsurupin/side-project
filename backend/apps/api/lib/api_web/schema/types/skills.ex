defmodule ApiWeb.Schema.Types.Skills do
  use Absinthe.Schema.Notation


  object :skills do
    field :skills, list_of(:skill)
  end

  object :skill do
    field :id, :id
    field :name, :string
  end
end
