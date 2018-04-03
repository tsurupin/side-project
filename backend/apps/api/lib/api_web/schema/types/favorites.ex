defmodule ApiWeb.Schema.Types.Favorites do
  use Absinthe.Schema.Notation

  object :favorite do
    field :id, :id
    field :type, :string, resolve: &favorite_type/2
    field :target_user, :user
    field :target_project, :project
  end

  defp favorite_type(_, %{source: %{target_user_id: id}}) when is_integer(id) do
    {:ok, "user"}
  end

  defp favorite_type(_, %{source: %{target_project_id: id}}) when is_integer(id) do
    {:ok, "project"}
  end

  # input_object :favorite_input do
  #   field :target_id, non_null(:integer)
  #   field :target_type, non_null(:string)
  # end

end
