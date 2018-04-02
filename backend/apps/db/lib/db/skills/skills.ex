defmodule Db.Skills.Skills do
  import Ecto.Changeset
  import Ecto.Query, only: [from: 1, from: 2, first: 1]
  alias Ecto.Multi
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

  @spec get_by(map) :: Skill.t :: nil
  def get_by(%{name: name}) do
    Repo.get_by(Skill, name: name)
  end

  @spec create(String.t) :: {:ok, Skill.t} | {:error, any}
  def create(name) do
    Skill.changeset(%{name: name})
    |> Repo.insert
  end

  def bulk_upsert_user_skills(multi, _user_id, _rank, [])  do
    multi
  end

  def bulk_upsert_user_skills(multi, user_id, rank, [skill_id | tail])  do
    user_skill_change_set = UserSkill.changeset(%{user_id: user_id, rank: rank, skill_id: skill_id})

    multi
    |> Multi.insert_or_update(Ecto.UUID.generate, user_skill_change_set)
    |> bulk_upsert_user_skills(user_id, rank + 1, tail)
  end

  def bulk_create_project_skills(project_id, rank, skill_ids) do
    Multi.new
    |> bulk_create_project_skills(project_id, rank, skill_ids)
  end

  def bulk_create_project_skills(multi, _project_id, _rank, [])  do
    case Repo.transaction(multi) do
      {:ok, multi} -> {:ok, multi}
      {:error, __name, changeset, _} -> {:error, changeset}
    end
  end

  def bulk_create_project_skills(multi, project_id, rank, [skill_id | tail]) do
    project_skill_change_set = ProjectSkill.changeset(%{project_id: project_id, rank: rank, skill_id: skill_id})
    multi
    |> Multi.insert(Ecto.UUID.generate, project_skill_change_set)
    |> bulk_create_project_skills(project_id, rank + 1, tail)
  end

  def bulk_upsert_project_skills(multi, _project_id, _rank, [])  do
    multi
  end

  def bulk_upsert_project_skills(multi, project_id, rank, [skill_id | tail])  do
    project_skill_change_set = ProjectSkill.changeset(%{project_id: project_id, rank: rank, skill_id: skill_id})
    multi
    |> Multi.insert_or_update(Ecto.UUID.generate, project_skill_change_set)
    |> bulk_upsert_project_skills(project_id, rank + 1, tail)
  end
end
