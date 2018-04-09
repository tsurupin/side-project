defmodule ApiWeb.Schema.Resolvers.Skills do
  alias Db.Skills.Skills

  def search(_parent, %{term: term}, _resolver) do
    skills = Skills.search(term)

    {:ok, skills}
  end

  def create(_parent, %{name: name} = attrs, _cxt) do
    skill = Skills.get_by(attrs)
    IO.inspect(skill)

    if skill do
      {:ok, skill}
    else
      case Skills.create(name) do
        {:ok, skill} -> {:ok, skill}
        {:error, reason} -> {:error, reason}
      end
    end
  end
end
