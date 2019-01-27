defmodule Db.Skills.Skills do
  @moduledoc """
  A context that is responsible for Skill related data layer
  """
  import Ecto.Changeset
  import Ecto.Query, only: [from: 1, from: 2, first: 1]
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Skills.{AliveSkill}

  @default_rank 0

  @spec search(String.t()) :: [AliveSkill.t()]
  def search(term), do: search(AliveSkill, term)

  @spec search(Ecto.Queryable.t(), String.t()) :: [AliveSkill.t()]
  def search(query, term) when is_nil(term), do: Repo.all(query)

  def search(query, term) do
    query =
      from(
        s in query,
        where: ilike(s.name, ^"#{term}%")
      )

    Repo.all(query)
  end

  @spec get_by(map) :: AliveSkill.t() :: no_return
  def get_by(%{name: name}) do
    Repo.get_by(AliveSkill, name: name)
  end

  @spec create(String.t()) :: {:ok, AliveSkill.t()} | {:error, String.t()}
  def create(name) do
    case AliveSkill.changeset(%{name: name}) |> Repo.insert() do
      {:ok, %AliveSkill{} = skill} -> {:ok, skill}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end
end
