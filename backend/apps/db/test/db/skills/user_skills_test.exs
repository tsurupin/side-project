defmodule Db.UserSkillsTest do
  use Db.DataCase
  alias Db.Skills.{UserSkills, UserSkill}
  alias Db.Repo
  import Ecto.Query, only: [from: 1, from: 2]

  describe "bulk_upsert_user_skills/4" do
    test "succeeds to build multi" do
      user = Factory.insert(:user)
      skill1 = Factory.insert(:skill)
      skill2 = Factory.insert(:skill)
      skill3 = Factory.insert(:skill)
      Factory.insert(:user_skill, user: user, skill: skill2, rank: 0)

      Factory.insert(:user_skill, user: user, skill: skill3)

      output = UserSkills.build_upsert_user_skills_multi(user.id, [skill1.id, skill2.id])


      assert {:ok, changeset} = Repo.transaction(output)

      user_skills = Repo.all(from(us in UserSkill, where: us.user_id == ^user.id))

      assert Enum.map(user_skills, & &1.skill_id) == [skill1.id, skill2.id]
      assert Enum.map(user_skills, & &1.rank) == [0, 1]
    end
  end
end
