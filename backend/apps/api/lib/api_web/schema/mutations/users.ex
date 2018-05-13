defmodule ApiWeb.Schema.Mutations.Users do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.Resolvers
  alias ApiWeb.Schema.Middleware

  object :users_mutations do
    @desc "User Signup"
    field :sign_up, :user do
      arg(:provider_id, non_null(:string))
      arg(:uid, non_null(:string))
      resolve(&Resolvers.Users.sign_up/3)
    end

    @desc "Edit user info"
    field :edit_user, :boolean do
      arg(:user_input, :user_input)
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Users.edit/3)
    end

    @desc "Upload user photo"
    field :upload_user_photo, :boolean do
      arg(:user_upload_input, :user_upload_input)
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Users.upload_photo/3)
    end

    @desc "Delete user photo"
    field :delete_user_photo, :boolean do
      arg(:photo_id, non_null(:integer))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Users.delete_photo/3)
    end
  end
end
