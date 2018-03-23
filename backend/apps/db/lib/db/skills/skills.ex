defmodule Db.Skills.Skills do
  import Ecto.Changeset
  import Ecto.Query, only: [from: 1, from: 2, first: 1]
  alias Db.Repo
  alias Db.Skills.{UserSkill, ProjectSkill, Skill}
  alias __MODULE__

  @spec search(charlist()) :: list(Skill)
  def search(term), do: search(Skill, term)

  @spec search(Ecto.Query, charlist()) :: list(Skill)
  def search(query, term) when is_nil(term), do: query
  def search(query, term) do
    query =
      from(
      s in query,
      where: ilike(s.name, ^"%#{term}%")
    )
    Repo.all(query)
  end

end
