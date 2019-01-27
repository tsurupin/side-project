defmodule Db.Skills.UserSkills do
  @moduledoc """
  A context that is responsible for UserSkill related data
  """
  import Ecto.Changeset
  import Ecto.Query, only: [from: 1, from: 2, first: 1]
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Skills.{UserSkill, AliveUserSkill}

  @default_rank 0
  @spec build_upsert_user_skills_multi(integer, list(integer)) :: Multi.t()
  def build_upsert_user_skills_multi(user_id, skill_ids) do
    Multi.new()
    |> build_upsert_user_skills_multi(user_id, skill_ids)
  end

  @spec build_upsert_user_skills_multi(Multi.t(), integer, nonempty_list(integer)) :: Multi.t()
  def build_upsert_user_skills_multi(multi, user_id, skill_ids) do
    deleted_skill_query =
      from(us in AliveUserSkill, where: us.user_id == ^user_id and us.skill_id not in ^skill_ids)

    multi
    |> Multi.delete_all(:deleted_user_skills, deleted_skill_query, set: [deleted_at:  DateTime.truncate(DateTime.utc_now, :second)])
    |> build_upsert_user_skills_multi(user_id, @default_rank, skill_ids)
  end

  @spec build_upsert_user_skills_multi(Multi.t(), integer, integer, []) :: Multi.t()
  def build_upsert_user_skills_multi(multi, _user_id, _rank, []) do
    multi
  end

  @spec build_upsert_user_skills_multi(Multi.t(), integer, integer, nonempty_list(integer)) ::
          Multi.t()
  def build_upsert_user_skills_multi(multi, user_id, rank, [skill_id | tail]) do
    user_skill_changeset =
      case Repo.get_by(AliveUserSkill, user_id: user_id, skill_id: skill_id) do
        %AliveUserSkill{} = user_skill ->
          AliveUserSkill.edit_changeset(user_skill, %{rank: rank})

        nil ->
          AliveUserSkill.changeset(%{user_id: user_id, rank: rank, skill_id: skill_id})
      end

    multi
    |> Multi.insert_or_update(Ecto.UUID.generate(), user_skill_changeset)
    |> build_upsert_user_skills_multi(user_id, rank + 1, tail)
  end
end
