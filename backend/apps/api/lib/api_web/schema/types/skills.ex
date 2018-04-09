defmodule ApiWeb.Schema.Types.Skills do
  use Absinthe.Schema.Notation

  object :skill do
    field(:id, :id)
    field(:name, :string)
  end
end
