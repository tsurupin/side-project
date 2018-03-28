defmodule ApiWeb.Schema.Resolvers.Projects do
  alias Db.Projects.Projects

  def fetch_profile(_, %{id: id}, _) do
    case Projects.get_by(%{id: id}) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}
      {:ok, project} ->
        project = Projects.preload(project, [:photos, :skills, :genre, :owner])
        {:ok, project}
    end
  end

  def search(_, %{conditions: conditions}, _) do
    case Projects.search(conditions) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}
      {:ok, projects} ->
        projects = Projects.preload(projects, [:photos, :genre])
        {:ok, projects}
    end
  end

end
