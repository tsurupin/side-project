defmodule ApiWeb.Schema.AccountsType do
  use Absinthe.Schema.Notation

  object :user do
    field :display_name, :string
    field :email, :string
  end
end
