defmodule ApiWeb.Schema.Mutations.Users do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers
  alias ApiWeb.Schema.Middleware

  object :users_mutations do
    @desc "User Signup"
    field :sign_up, :user do
      arg(:provider_id, non_null(:string))
      arg(:uid, non_null(:string))
      resolve(&Resolvers.Users.signup/3)
    end

  end
end
