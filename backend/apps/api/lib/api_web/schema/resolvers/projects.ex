defmodule ApiWeb.Schema.Resolvers.Projects do
  alias Db.Users.Projects

  def fetch_profile(_, %{id: id}, _) do
    case Projects.get_by(%{id: id}) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}
      {:ok, project} ->
        project = Projects.preload(project, [:photos, :skills, :genre, :owner])
        {:ok, project}
    end
  end
end
