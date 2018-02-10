defmodule ApiWeb.Schema.AccountsType do
  use Absinthe.Schema.Notation

  object :user do
    field :token, :string
    field :refresh_token, :string
    field :uid, :string
    field :provider_id, :string
    field :display_name, :string
    field :email, :string
    field :photo_url, :string
  end
end
