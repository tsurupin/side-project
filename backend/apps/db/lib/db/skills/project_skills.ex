defmodule Db.Skills.ProjectSkills do
  @moduledoc """
  A context that is responsible for ProjectSkill data
  """
  import Ecto.Changeset

  import Ecto.Query, only: [from: 1, from: 2]
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Skills.{ProjectSkill, AliveProjectSkill}

  @default_rank 0
  @spec build_upsert_project_skills_multi(integer, nonempty_list(integer)) ::
          {:ok, Multi.t()} | {:error, String.t()}
  def build_upsert_project_skills_multi(project_id, skill_ids) do
    Multi.new()
    |> build_upsert_project_skills_multi(project_id, skill_ids)
  end

  @spec build_upsert_project_skills_multi(Multi.t(), integer, nonempty_list(integer)) :: Multi.t()
  def build_upsert_project_skills_multi(multi, project_id, skill_ids) do
    deleted_skill_query =
      from(ps in AliveProjectSkill,
        where: ps.project_id == ^project_id and ps.skill_id not in ^skill_ids
      )

    multi
    |> Multi.update_all(:deleted_project_skills, deleted_skill_query, set: [deleted_at: DateTime.truncate(DateTime.utc_now, :second)])
    |> build_upsert_project_skills_multi(project_id, @default_rank, skill_ids)
  end

  @spec build_upsert_project_skills_multi(Multi.t(), integer, integer, []) :: Multi.t()
  def build_upsert_project_skills_multi(multi, _project_id, _rank, []) do
    multi
  end

  def build_upsert_project_skills_multi(multi, project_id, rank, [skill_id | tail]) do
    project_skill_changeset =
      case Repo.get_by(AliveProjectSkill, project_id: project_id, skill_id: skill_id) do
        %AliveProjectSkill{} = project_skill ->
          AliveProjectSkill.edit_changeset(project_skill, %{rank: rank})

        nil ->
          AliveProjectSkill.changeset(%{project_id: project_id, rank: rank, skill_id: skill_id})
      end

    multi
    |> Multi.insert_or_update(Ecto.UUID.generate(), project_skill_changeset)
    |> build_upsert_project_skills_multi(project_id, rank + 1, tail)
  end
end
