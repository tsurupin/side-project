defmodule ApiWeb.Schema.UserTypes do
  use Absinthe.Schema.Notation


  enum :status do
    value :not_compeleted
    value :completed
    value :unactive
  end

  object :user do
    field :id, :id
    field :display_name, :string
    field :genre, :genre
    field :occupation_type, :occupation_type
    field :schoold_name, :string
    field :status, :status
    field :area_name, :string
    field :country, :country
  end

end
