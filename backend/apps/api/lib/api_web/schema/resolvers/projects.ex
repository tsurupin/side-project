defmodule ApiWeb.Schema.Resolvers.Projects do
  alias Db.Projects.{Projects, Photos}
  alias Db.Genres.Genres

  def fetch_profile(_, %{id: id}, _) do
    case Projects.get_by(%{id: id}) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}

      {:ok, project} ->
        project = Projects.preload(project, [:photos, :skills, :city, :genre, :owner])
        {:ok, project}
    end
  end

  def fetch_search_form(_, _, _) do
    genres = Genres.all
    {:ok, %{genres: genres}}
  end

  def search(_, %{conditions: conditions}, _) do
    case Projects.search(conditions) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}

      {:ok, projects} ->
        projects = Projects.preload(projects, [:photos, :genre, :city])
        {:ok, projects}
    end
  end

  def liked_by(_, _, %{context: %{current_user: current_user}}) do
    case Projects.liked_by(current_user.id) do
      {:ok, projects} ->
        projects = Projects.preload(projects, [:photos, :genre, :city])
        {:ok, projects}
    end
  end

  def create(_, %{project_input: project_input}, %{context: %{current_user: current_user}}) do
    case Projects.create(Map.put_new(project_input, :owner_id, current_user.id)) do
      {:ok, project} -> {:ok, project}
      {:error, message} -> {:error, message}
    end
  end

  def change_status(_, %{project_id: project_id, status: status} = attrs, %{
        context: %{current_user: current_user}
      }) do
    case Projects.change_status(current_user.id, attrs) do
      {:ok, _project} -> {:ok, true}
      {:error, message} -> {:error, message}
    end
  end

  def edit(_, %{id: project_id, project_input: project_input} = attrs, %{
        context: %{current_user: current_user}
      }) do
    case Projects.edit(current_user.id, Map.put_new(project_input, :project_id, project_id)) do
      {:ok, project} -> {:ok, project}
      {:error, reason} -> {:error, reason}
    end
  end

  def upload_photo(ctx, %{project_id: _project_id, photo: _photo, rank: _rank} = attrs, %{
        context: %{current_user: current_user}
      }) do
    case Photos.upload_photo(current_user.id, attrs) do
      {:ok, _repo} -> {:ok, true}
      {:error, reason} -> {:error, reason}
    end
  end

  def delete_photo(_ctx, %{photo_id: photo_id}, %{context: %{current_user: current_user}}) do
    case Photos.delete_photo(current_user.id, photo_id) do
      {:ok, _multi} -> {:ok, true}
      {:error, reason} -> {:error, reason}
    end
  end
end
