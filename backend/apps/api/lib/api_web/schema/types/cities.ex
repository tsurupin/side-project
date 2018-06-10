defmodule ApiWeb.Schema.Types.Cities do
  use Absinthe.Schema.Notation

  object :city do
    field(:id, :id)
    field(:name, :string)
    field(:state_name, :string)
    field(:state_abbreviation, :string)
  end
end
