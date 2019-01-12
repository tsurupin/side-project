defmodule ApiWeb.Schema.Resolvers.Projects do
  alias Db.Projects.{Projects, Photos}
  alias Db.Genres.Genres
  alias Db.Repo

  def fetch_profile(_, %{id: id}, %{context: %{current_user: current_user}}) do
    case Projects.get_by(%{id: id}) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}

      {:ok, project} ->
        project =
          Repo.preload(project, [
            :photos,
            :skills,
            :city,
            :genre,
            :owner,
            {:users, :occupation_type}
          ])
        has_liked = Projects.has_liked(%{user_id: current_user.id, project_id: id})

        {:ok, Map.merge(project, %{has_liked: has_liked})}
    end
  end

  def fetch_editable(_, _, %{context: %{current_user: current_user}}) do
    case Projects.editable(current_user.id) do
      {:ok, projects} ->
        projects = Repo.preload(projects, [:photos, :genre, :city, {:users, :occupation_type}])

        {:ok, projects}
    end
  end

  def fetch_search_form(_, _, _) do
    genres = Genres.all()
    {:ok, %{genres: [%{id: nil, name: "All"}] ++ genres}}
  end

  def fetch_form(_, _, _) do
    genres = Genres.all()
    {:ok, %{genres: genres}}
  end

  def search(_, %{conditions: conditions}, %{context: %{current_user: current_user}}) do
    case Projects.search(%{conditions: conditions, user_id: current_user.id}) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}

        
      {:ok, projects} ->
        projects =
          Repo.preload(projects, [:photos, :genre, :city, :owner, {:users, :occupation_type}])

        {:ok, projects}
    end
  end

  def liked_by(_, _, %{context: %{current_user: current_user}}) do
    case Projects.liked_by(current_user.id) do
      {:ok, projects} ->
        projects = Repo.preload(projects, [:photos, :genre, :city, {:users, :occupation_type}])

        {:ok, projects}
    end
  end

  def create(_, %{project_input: project_input}, %{context: %{current_user: current_user}}) do
    case Projects.create(Map.put_new(project_input, :owner_id, current_user.id)) do
      {:ok, project} ->
        {:ok, project}

      {:error, message} ->
        IO.inspect(message)
        {:error, message}
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
    case Projects.edit(current_user.id, Map.merge(project_input, %{project_id: project_id})) do
      {:ok, project} ->
        project =
          Repo.preload(project, [
            :photos,
            :skills,
            :city,
            :genre,
            :owner,
            {:users, :occupation_type}
          ])

        {:ok, project}

      {:error, reason} ->
        {:error, reason}
    end
  end

  def upload_photo(
        ctx,
        %{project_upload_input: %{project_id: _project_id, photo: _photo, rank: _rank} = attrs},
        %{
          context: %{current_user: current_user}
        }
      ) do
    case Photos.upload_photo(%{user_id: current_user.id, photo_inputs: attrs}) do
      {:ok, photo} ->
        {:ok, photo}

      {:error, reason} ->
        IO.inspect(reason)
        {:error, reason}
    end
  end

  def delete_photo(_ctx, %{photo_id: photo_id}, %{context: %{current_user: current_user}}) do
    case Photos.delete_photo(%{user_id: current_user.id, photo_id: photo_id}) do
      {:ok, photo} ->
        {:ok, photo}

      {:error, reason} ->
        {:error, reason}
    end
  end
end
