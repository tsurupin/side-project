defmodule ApiWeb.Schema.Resolvers.Skills do
  alias Db.Skills.Skills

  def search(_parent, %{term: term}, _resolver) do
    skills =
      term
      |> Skills.search

    {:ok, skills}
  end
end
