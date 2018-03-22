defmodule ApiWeb.Resolvers.Skills do
  alias Db.Skills.Skills

  def search(_parent, %{term: term} = args, _resolver) do

    case Skills.search(term) do
      {:ok, skills} -> {:ok, skills}
      {:error, reason} -> {:error, reason}
    end
  end
end
