defmodule Db.ProjectsTest do
  use Db.DataCase
  alias Db.Projects.{Projects}
  alias Db.Repo

  describe "search/1" do
    test "returns all completed projects without conditions" do
    end

    test "returns matched projects that are associated to skill conditions" do
    end

    test "returns matched projects that are associated to city conditions" do
    end

    test "returns matched projects that are associated to genre conditions" do
    end

    test "returns matched projects that are associated to genre and skills conditions" do
    end
  end

  describe "editable/1" do
    test "returns editable projects" do
    end
  end

  describe "liked_by/1" do
    test "returns projects that user liked" do
    end
  end

  describe "create/1" do
    test "succeeds to create a project" do
    end

    test "fails to create a project because of unexpected input" do
    end
  end

  describe "edit/2" do
    test "succeeds to edit a project" do
    end

    test "fails to edit a project because the user is not owner of the project" do
    end

    test "fails to edit a project because of unexpected input" do
    end
  end

  describe "change_status/2" do
    test "fails to change status and returns :unauthorized" do
    end

    test "fails to change status and returns error reason" do
    end

    test "succceeds to change status to approved" do
    end

    test "succeeds to change status to " do
    end
  end

  describe "remove_member_from_project/1" do
    test "succeds to remove a member" do
    end

    test "fails to remove a member" do
    end
  end
end
