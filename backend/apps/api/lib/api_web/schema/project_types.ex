defmodule ApiWeb.Schema.ProjectTypes do
  use Absinthe.Schema.Notation


  enum :status do
    value :editing
    value :completed
  end

  object :project do
    field :id, :id
    field :name, :string
    field :genre, :genre
    field :status, :status
    field :owner, :user
    field :lead_sentence, :string
    field :requirement, :string
    field :motivation, :string
    field :updated_at, :datetime
  end


  object :projects do
    field :projects, list_of(:project)
  end
end
