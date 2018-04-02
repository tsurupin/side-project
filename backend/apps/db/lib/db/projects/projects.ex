defmodule Db.Projects.Projects do
  @moduledoc """
  The Accoutns context.
  """

  import Ecto.Query, warn: false

  alias Db.Repo
  alias Db.Projects.Project
  alias Db.Projects.Photo
  alias Db.Skills.ProjectSkill

  @spec get_by(integer) :: map()
  def get_by(%{id: id}) do
    case Repo.get_by(Project, id: id, status: 1) do
      nil -> {:error, :not_found}
      project -> {:ok, project}
    end
  end

  @spec search(map) :: map
  def search(conditions), do: search(Project, conditions)

  @spec search(Ecto.Query, map):: map()
  def search(query, conditions) do
    projects = Repo.all(build_queries(query, conditions))
    {:ok, projects}
  end

  #@spect create(map) :: {:ok, Project.t} | {:error, String.t}
  def create(%{skill_ids: skill_ids} = attrs) do
    Multi.new
    |> Multi.insert(:project, Project.changeset(attrs))
    |> Db.Skills.Skills.bulk_upsert_project_skills(project.id, 0, skill_ids)
    |> Repo.transaction
    case Project.changeset(attrs) |> Repo.insert do
      {:ok, project} -> {:ok, project}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  def create(attrs) do
    case Project.changeset(attrs) |> Repo.insert do
      {:ok, project} -> {:ok, project}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  def edit(%Project{} = project, %{skill_ids: skill_ids} = attrs) do
    Multi.new
    |> Multi.update(:project, Project.edit_changeset(project, attrs))
    |> Db.Skills.Skills.bulk_upsert_project_skills(project.id, 0, skill_ids)
    |> Repo.transaction
  end

  def edit(%Project{} = project, attrs) do
    project
    |> Project.edit_changeset(attrs)
    |> Repo.update
  end

  #@spec edit(integer, map) :: [:ok, User.t] || [:error, ]
  def edit(user_id, %{project_id: project_id} = attrs) do
    case Repo.get_by(Project, owner_id: user_id, id: project_id) do
      nil -> {:error, "not_authorized"}
      project -> edit(project, attrs)
    end
  end

  def change_status(%Project{}= project, attrs) do
    Project.change_status_changeset(project, attrs)
    |> Repo.update
  end

  def change_status(user_id, %{project_id: project_id, status: status} = attrs) do
    case Repo.get_by(Project, owner_id: user_id, id: project_id) do
      nil -> {:error, :not_authorized}
      project -> Projects.change_status(project, attrs)
    end
  end


  @spec main_photo(Project.t()) :: Photo.t()
  def main_photo(project) do
    Repo.one(
      from p in Photo,
      where: p.project_id == ^project.id and p.is_main == true
    )
  end

  #@spec preload(Ecto.Query, any): Repo
  def preload(query, association) when is_binary(association) do
    Repo.preload(query, [String.to_atom(association)])
  end

  def preload(query, association) when is_atom(association) do
    Repo.preload(query, [association])
  end

  def preload(query, associations) when is_list(associations) do
     Repo.preload(query, associations)
  end

  @limit_num 15
  @spec build_queries(Ecto.Query, map):: list(Ecto.Query)
  defp build_queries(query, conditions) do
    queries =
      Enum.reduce(conditions, query, fn
        {:genre_id, genre_id}, queries ->
          from p in queries,
          where: p.genre_id == ^genre_id
        {:skill_ids, skill_ids}, queries ->
          from p in queries,
          join: ps in ProjectSkill,
          where: ps.project_id == p.id and ps.skill_id in(^skill_ids)
        _, queries ->
          queries
      end)
      |> limit(@limit_num)

    from p in queries,
    where: p.status == 1
  end

end
