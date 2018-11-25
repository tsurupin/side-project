defmodule Db.Skills.Skills do
  @moduledoc """
  A context that is responsible for Skill related data layer
  """
  import Ecto.Changeset
  import Ecto.Query, only: [from: 1, from: 2, first: 1]
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Skills.{UserSkill, ProjectSkill, Skill}
  alias __MODULE__

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

  @spec build_upsert_user_skills_multi(integer, list(integer)) :: Ecto.Multi.t()
  def build_upsert_user_skills_multi(user_id, skill_ids) do
    Multi.new()
    |> build_upsert_user_skills_multi(user_id, @default_rank, skill_ids)
  end

  @spec build_upsert_user_skills_multi(Ecto.Multi.t(), integer, integer, []) :: Ecto.Multi.t()
  def build_upsert_user_skills_multi(multi, _user_id, _rank, []) do
    multi
  end

  @spec build_upsert_user_skills_multi(Ecto.Multi.t(), integer, integer, nonempty_list(integer)) ::
          Ecto.Multi.t()
  def build_upsert_user_skills_multi(multi, user_id, rank, [skill_id | tail]) do
    user_skill_change_set =
      UserSkill.changeset(%{user_id: user_id, rank: rank, skill_id: skill_id})

    user_skill_changeset =
      case Repo.get_by(UserSkill, user_id: user_id, skill_id: skill_id) do
        %UserSkill{} = user_skill -> UserSkill.edit_changeset(user_skill, %{rank: rank})
        nil -> UserSkill.changeset(%{user_id: user_id, rank: rank, skill_id: skill_id})
      end

    multi
    |> Multi.insert_or_update(Ecto.UUID.generate(), user_skill_change_set)
    |> build_upsert_user_skills_multi(user_id, rank + 1, tail)
  end


  # def bulk_create_project_skills(multi, project_id, rank, [skill_id | tail]) do
  #   project_skill_change_set =
  #     ProjectSkill.changeset(%{project_id: project_id, rank: rank, skill_id: skill_id})

  #   multi
  #   |> Multi.insert(Ecto.UUID.generate(), project_skill_change_set)
  #   |> bulk_create_project_skills(project_id, rank + 1, tail)
  # end

  # @spec bulk_create_project_skills(Ecto.Multi.t(), integer, integer, []) ::
  #         {:ok, Ecto.Multi.t()} | {:error, String.t()}
  # def bulk_create_project_skills(multi, _project_id, _rank, []) do
  #   case Repo.transaction(multi) do
  #     {:ok, multi} -> {:ok, multi}
  #     {:error, __name, changeset, _} -> {:error, Db.FullErrorMessage.message(changeset)}
  #   end
  # end

  @spec build_upsert_project_skills_multi(integer, nonempty_list(integer)) ::
  {:ok, Ecto.Multi.t()} | {:error, String.t()}
  def build_upsert_project_skills_multi(project_id, skill_ids) do
    Multi.new()
    |> build_upsert_project_skills_multi(project_id, @default_rank, skill_ids)
  end

  @spec build_upsert_project_skills_multi(Ecto.Multi.t(), integer, nonempty_list(integer)) :: Ecto.Multi.t()
  def build_upsert_project_skills_multi(multi, project_id, skill_ids) do
    build_upsert_project_skills_multi(multi, project_id, @default_rank, skill_ids)
  end


  @spec build_upsert_project_skills_multi(Ecto.Multi.t(), integer, integer, []) ::
          Ecto.Multi.t()
  def build_upsert_project_skills_multi(multi, _project_id, _rank, []) do
    multi
  end

  def build_upsert_project_skills_multi(multi, project_id, rank, [skill_id | tail]) do
    project_skill_changeset =
      case Repo.get_by(ProjectSkill, project_id: project_id, skill_id: skill_id) do
        %ProjectSkill{} = project_skill ->
          ProjectSkill.edit_changeset(project_skill, %{rank: rank})

        nil ->
          ProjectSkill.changeset(%{project_id: project_id, rank: rank, skill_id: skill_id})
      end

    multi
    |> Multi.insert_or_update(Ecto.UUID.generate(), project_skill_changeset)
    |> build_upsert_project_skills_multi(project_id, rank + 1, tail)
  end
end
