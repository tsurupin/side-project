defmodule ApiWeb.Schema.Queries.SkillsTest do
  use ApiWeb.ConnCase, async: false

  describe "skills query" do
    setup do
      ruby_skill = Factory.insert(:skill, name: "Ruby")
      python_skill = Factory.insert(:skill, name: "Python")

      {:ok, ruby_skill: ruby_skill, python_skill: python_skill}
    end

    @query """
      query($term: String!) {
        skills(term: $term) {
          id
          name
        }
      }

    """

    test "return skills with term", %{ruby_skill: ruby_skill} do
      conn = build_conn()
      conn = get(conn, "/api", %{query: @query, variables: %{term: "Ruby"}})
      response = json_response(conn, 200)
      expected_result = %{"skills" => [%{"id" => "#{ruby_skill.id}", "name" => ruby_skill.name}]}

      assert response["data"] == expected_result
    end
  end
end
