defmodule ApiWeb.Schema.Queries.Users do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers

  object :users_queries do
    @desc "Fetch user info"
    field :user, :user do
      arg :id, :id
      resolve &Resolvers.User.call/3
    end
  end

end
