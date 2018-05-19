defmodule ApiWeb.Schema.Resolvers.SkillsTest do
  use ApiWeb.ConnCase, async: true
  alias ApiWeb.Schema.Resolvers.Skills

  describe "search" do
    setup do
      skill1 = Factory.insert(:skill, name: "Python")
      skill2 = Factory.insert(:skill, name: "Ruby")

      {
        :ok,
        skill1: skill1, skill2: skill2
      }
    end

    test "returns empty list", _context do
      {:ok, skills} = Skills.search(nil, %{name: "hoge"}, nil)

      assert Enum.empty?(skills)
    end

    test "returns skill list", context do
      {:ok, skills} = Skills.search(nil, %{name: "rub"}, nil)
      skill_ids = Enum.map(skills, & &1.id)
      assert skill_ids == [context[:skill2].id]
    end
  end
end
