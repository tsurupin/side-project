defmodule ApiWeb.Schema.Types.Matches do
  use Absinthe.Schema.Notation

  object :match_list do
    field :liked_user_list, list_of(:user)
    field :chat_list, list_of(:chat)
  end

end
