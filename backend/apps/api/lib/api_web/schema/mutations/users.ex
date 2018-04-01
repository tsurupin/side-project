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

    @desc "Edit user info"
    field :edit_user, :boolean do
      arg :user_input, :user_input
      middleware Middleware.Authorize
      resolve(&Resolvers.Users.edit/3)
    end

    @desc "Upload user image"
    field :upload_user_image, :boolean do
      arg :image, non_null(:upload)
      middleware Middleware.Authorize
      resolve(&Resolvers.Users.upload_image/3)
    end

    @desc "Delte user image"
    field :delete_user_image, :boolean do
      arg :image_id, non_null(:integer)
      middleware Middleware.Authorize
      resolve(&Resolvers.Users.delete_image/3)
    end

  end
end
