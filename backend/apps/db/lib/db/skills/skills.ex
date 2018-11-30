defmodule Db.Skills.Skills do
  @moduledoc """
  A context that is responsible for Skill related data layer
  """
  import Ecto.Changeset
  import Ecto.Query, only: [from: 1, from: 2, first: 1]
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Skills.{UserSkill, ProjectSkill, Skill}

  @default_rank 0

  @spec search(String.t()) :: [Skill.t()]
  def search(term), do: search(Skill, term)

  @spec search(Ecto.Queryable.t(), String.t()) :: [Skill.t()]
  def search(query, term) when is_nil(term), do: Repo.all(query)

  def search(query, term) do
    query =
      from(
        s in query,
        where: ilike(s.name, ^"#{term}%")
      )

    Repo.all(query)
  end

  @spec get_by(map) :: Skill.t() :: no_return
  def get_by(%{name: name}) do
    Repo.get_by(Skill, name: name)
  end

  @spec create(String.t()) :: {:ok, Skill.t()} | {:error, String.t()}
  def create(name) do
    case Skill.changeset(%{name: name}) |> Repo.insert() do
      {:ok, %Skill{} = skill} -> {:ok, skill}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end
end
