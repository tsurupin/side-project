defmodule Db.SkillsTest do
  use Db.DataCase
  alias Db.Skills.{Skills, UserSkill, ProjectSkill}
  alias Db.Repo

  describe "search/2" do
    test "returns matched skills without term" do
      term = "rub"
      skill1 = Factory.insert(:skill, name: "Ruby")
      skill2 = Factory.insert(:skill, name: "Python")

      output = Skills.search(term)
      assert Enum.map(output, &(&1.id)) == [skill1.id]
    end

    test "returns matched skills with term" do
      skill1 = Factory.insert(:skill, name: "Ruby")
      skill2 = Factory.insert(:skill, name: "Python")

      output = Skills.search(nil)

      assert Enum.map(output, &(&1.id)) == [skill1.id, skill2.id]
    end


  end

  describe "build_upsert_user_skills_multi/4" do
    test "succeeds to build multi" do
      user = Factory.insert(:user)
      skill1 = Factory.insert(:skill)
      skill2 = Factory.insert(:skill)

      output = Skills.build_upsert_user_skills_multi(user.id, [skill1.id, skill2.id])
      assert {:ok, changeset} = Repo.transaction(output)
      user_skills = Repo.all(UserSkill)
      assert Enum.map(user_skills, &(&1.skill_id)) == [skill1.id, skill2.id]
      assert Enum.map(user_skills, &(&1.rank)) == [0, 1]
    end

  end

  describe "bulk_upsert_project_skills/4" do
    test "succeeds to build multi" do
      project = Factory.insert(:project)
      skill1 = Factory.insert(:skill)
      skill2 = Factory.insert(:skill)

      output = Skills.build_upsert_project_skills_multi(project.id, [skill1.id, skill2.id])
      assert {:ok, changeset} = Repo.transaction(output)
      project_skills = Repo.all(ProjectSkill)
      assert Enum.map(project_skills, &(&1.skill_id)) == [skill1.id, skill2.id]
      assert Enum.map(project_skills, &(&1.rank)) == [0, 1]

    end
  end
end
