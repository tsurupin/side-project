defmodule ApiWeb.Schema.SkillTypes do
  use Absinthe.Schema.Notation

  
  object :skills do
    field :skills, list_of(:skill)
    ## Add auto complete
  end

  object :skill do
    field :id, :id
    field :name, :string
  end
end
