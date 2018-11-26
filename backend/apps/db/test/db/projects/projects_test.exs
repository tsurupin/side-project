defmodule Db.ProjectsTest do
  use Db.DataCase
  alias Db.Projects.{Projects, Member}
  alias Db.Skills.{ProjectSkill}
  alias Db.Repo

  describe "search/1" do
    test "returns all completed projects without conditions" do
      project = Factory.insert(:project, status: :completed)
      project = Factory.insert(:project, status: :editing)
      assert {:ok, [project]} = Projects.search(%{})
    end

    test "returns matched projects that are associated to skill conditions" do
      project1 = Factory.insert(:project, status: :completed)
      project2 = Factory.insert(:project, status: :completed)
      project_skill = Factory.insert(:project_skill, project: project1)

      assert {:ok, [project1]} = Projects.search(%{skill_ids: [project_skill.skill_id]})
    end

    test "returns matched projects that are associated to city conditions" do
      project1 = Factory.insert(:project, status: :completed)
      project2 = Factory.insert(:project, status: :completed)

      assert {:ok, [project1]} = Projects.search(%{city_id: project1.city_id})
    end

    test "returns matched projects that are associated to genre conditions" do
      project1 = Factory.insert(:project, status: :completed)
      project2 = Factory.insert(:project, status: :completed)

      assert {:ok, [project1]} = Projects.search(%{genre_id: project1.genre_id})
    end

    test "returns matched projects that are associated to genre and skills conditions" do
      city = Factory.insert(:city)
      skill = Factory.insert(:skill)

      project1 = Factory.insert(:project, status: :completed, city: city)
      project2 = Factory.insert(:project, status: :completed)
      project3 = Factory.insert(:project, status: :completed, city: city)

      Factory.insert(:project_skill, skill: skill, project: project1)
      Factory.insert(:project_skill, skill: skill, project: project2)

      assert {:ok, [project1]} = Projects.search(%{city_id: city.id, skill_ids: [skill.id]})
    end
  end

  describe "editable/1" do
    test "returns editable projects" do
      user = Factory.insert(:user)
      project1 = Factory.insert(:project, status: :completed)
      project2 = Factory.insert(:project, status: :editing)

      project3 = Factory.insert(:project)

      Factory.insert(:project_member,
        project: project1,
        user: user,
        status: :approved,
        role: :master
      )

      Factory.insert(:project_member,
        project: project2,
        user: user,
        status: :approved,
        role: :master
      )

      Factory.insert(:project_member,
        project: project3,
        user: user,
        status: :requested,
        role: :master
      )

      assert {:ok, [project1, project2]} = Projects.editable(user.id)
    end
  end

  describe "liked_by/1" do
    test "returns projects that user liked" do
      user = Factory.insert(:user)
      project1 = Factory.insert(:project, status: :completed)
      project2 = Factory.insert(:project, status: :editing)

      project3 = Factory.insert(:project, status: :completed)

      Factory.insert(:project_like,
        project: project1,
        user: user
      )

      Factory.insert(:project_like,
        project: project2,
        user: user
      )

      assert {:ok, [project1]} = Projects.liked_by(user.id)
    end
  end

  describe "create/1" do
    test "succeeds to create a project" do
      user = Factory.insert(:user)
      skill = Factory.insert(:skill)

      inputs = %{owner_id: user.id, title: "title", skill_ids: [skill.id]}
      assert {:ok, project} = Projects.create(inputs)
      assert Repo.get_by(Member, project_id: project.id, user_id: user.id, role: :master)
      assert Repo.get_by(ProjectSkill, project_id: project.id, skill_id: skill.id)
    end

    test "fails to create a project because of unexpected input" do
      user = Factory.insert(:user)
      assert {:error, "title: can't be blank"} = Projects.create(%{owner_id: user.id})
    end
  end

  describe "edit/2" do
    test "succeeds to edit a project" do
      user = Factory.insert(:user)
      skill = Factory.insert(:skill)

      project = Factory.insert(:project, title: "old title")

      Factory.insert(:project_member,
        user: user,
        project: project,
        role: :admin,
        status: :approved
      )

      assert {:ok, project} =
               Projects.edit(user.id, %{
                 project_id: project.id,
                 title: "new title",
                 skill_ids: [skill.id]
               })

      assert Repo.get_by(ProjectSkill, project_id: project.id, skill_id: skill.id)
      assert project.title == "new title"
    end

    test "fails to edit a project because the user is not owner of the project" do
      user = Factory.insert(:user)
      project = Factory.insert(:project)

      assert {:error, :unauthorized} =
               Projects.edit(user.id, %{project_id: project.id, title: "title"})
    end

    test "fails to edit a project because of unexpected input" do
      user = Factory.insert(:user)
      project = Factory.insert(:project)
      project = Factory.insert(:project, title: "same title", owner: user)

      Factory.insert(:project_member,
        user: user,
        project: project,
        role: :admin,
        status: :approved
      )

      assert {:error, "title: can't be blank"} =
               Projects.edit(user.id, %{project_id: project.id, title: ""})
    end
  end

  describe "change_status/2" do
    test "fails to change status and returns :unauthorized" do
      user = Factory.insert(:user)
      project = Factory.insert(:project)

      assert {:error, :unauthorized} =
               Projects.change_status(user.id, %{project_id: project.id, status: "completed"})
    end

    test "fails to change status and returns error reason" do
      project = Factory.insert(:project, lead_sentence: nil)

      assert {:error, "status: is invalid"} =
               Projects.change_status(project.owner_id, %{
                 project_id: project.id,
                 status: "completed"
               })
    end

    test "succceeds to change status to completed" do
      project = Factory.insert(:project, status: :editing)

      assert {:ok, updated_project} =
               Projects.change_status(project.owner_id, %{
                 project_id: project.id,
                 status: "completed"
               })

      assert Repo.get_by(Db.Chats.Group, source_id: updated_project.id, source_type: "Project")
      assert updated_project.status == :completed
    end

    test "succeeds to change status to inactive" do
      project = Factory.insert(:project, status: :editing)

      assert {:ok, updated_project} =
               Projects.change_status(project.owner_id, %{
                 project_id: project.id,
                 status: "inactive"
               })

      assert updated_project.status == :inactive
    end
  end

  describe "remove_member_from_project/1" do
    test "succeds to remove a member" do
      user = Factory.insert(:user)
      project = Factory.insert(:project)

      Factory.insert(:project_member, user: user, project: project)

      assert {:ok, member} =
               Projects.remove_member_from_project(%{project_id: project.id, user_id: user.id})

      refute is_nil(member.deleted_at)
    end

    test "fails to remove a member" do
      user = Factory.insert(:user)
      project = Factory.insert(:project)

      assert {:error, :not_found} =
               Projects.remove_member_from_project(%{project_id: project.id, user_id: user.id})
    end
  end
end
