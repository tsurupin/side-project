defmodule ApiWeb.Schema.Mutations.Likes do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  object :likes_mutations do
    @desc "give like to target_user"
    field :like, :boolean do
      arg(:target_user_id, non_null(:integer))
      middleware Middleware.Authorize
      resolve(&Resolvers.Likes.like/3)
    end

    @desc "withdraw given like"
    field :withdraw_like, :boolean do
      arg(:target_user_id, :integer)
      middleware Middleware.Authorize
      resolve(&Resolvers.Likes.withdraw_like/3)
    end

    @desc "accept like"
    field :accept_like, :chat do
      arg(:like_id, :integer)
      middleware Middleware.Authorize
      resolve(&Resolvers.Likes.accept_like/3)
    end

    @desc "reject like"
    field :reject_like, :boolean do
      arg(:like_id, :integer)
      middleware Middleware.Authorize
      resolve(&Resolvers.Likes.reject_like/3)
    end
  end
end
