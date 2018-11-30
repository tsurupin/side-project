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
      assert Enum.map(output, & &1.id) == [skill1.id]
    end

    test "returns matched skills with term" do
      skill1 = Factory.insert(:skill, name: "Ruby")
      skill2 = Factory.insert(:skill, name: "Python")

      output = Skills.search(nil)

      assert Enum.map(output, & &1.id) == [skill1.id, skill2.id]
    end
  end
end
