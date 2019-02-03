defmodule Db.ProjectSkillsTest do
  use Db.DataCase
  alias Db.Skills.{ProjectSkills, ProjectSkill}
  alias Db.Repo
  import Ecto.Query, only: [from: 1, from: 2]

  describe "bulk_upsert_project_skills/4" do
    test "succeeds to build multi" do
      project = Factory.insert(:project)
      skill1 = Factory.insert(:skill)
      skill2 = Factory.insert(:skill)
      skill3 = Factory.insert(:skill)
      Factory.insert(:project_skill, project: project, skill: skill2, rank: 0)

      Factory.insert(:project_skill, project: project, skill: skill3)

      output = ProjectSkills.build_upsert_project_skills_multi(project.id, [skill1.id, skill2.id])

      assert {:ok, changeset} = Repo.transaction(output)

      project_skills =
        Repo.all(
          from(ps in ProjectSkill, where: ps.project_id == ^project.id and is_nil(ps.deleted_at))
        )

      assert Enum.map(project_skills, & &1.skill_id) == [skill1.id, skill2.id]
      assert Enum.map(project_skills, & &1.rank) == [0, 1]
    end
  end
end
