defmodule ApiWeb.Schema.Mutations.UserLikes do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  object :user_likes_mutations do
    @desc "give like to target_user"
    field :like_user, :boolean do
      arg(:target_user_id, non_null(:id))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.UserLikes.like/3)
    end

    @desc "withdraw given like"
    field :withdraw_user_like, :boolean do
      arg(:target_user_id, :integer)
      middleware(Middleware.Authorize)
      resolve(&Resolvers.UserLikes.withdraw_like/3)
    end

    @desc "accept like"
    field :accept_user_like, :chat do
      arg(:user_id, :id)
      middleware(Middleware.Authorize)
      resolve(&Resolvers.UserLikes.accept_like/3)
    end

    @desc "reject like"
    field :reject_user_like, :boolean do
      arg(:user_id, :id)
      middleware(Middleware.Authorize)
      resolve(&Resolvers.UserLikes.reject_like/3)
    end
  end
end
