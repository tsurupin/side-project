defmodule Db.Projects.Projects do
  @moduledoc """
  The Accoutns context.
  """

  import Ecto.Query, warn: false
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Projects.{Project, Member}
  alias Db.Users.{ProjectLike}
  alias Db.Projects.Photo
  alias Db.Skills.ProjectSkill
  alias Db.Chats.Chats

  @spec get_by(%{id: integer}) :: {:ok, Project.t()} | {:error, :not_found}
  def get_by(%{id: id}) do
    case Repo.get_by(Project, id: id) do
      %Project{} = project -> {:ok, project}
      nil -> {:error, :not_found}
    end
  end

  @spec search(map) :: {:ok, list(Project.t())}
  def search(conditions), do: search(Project, conditions)

  @spec search(Ecto.Queryable.t(), map) :: {:ok, list(Project.t())}
  def search(query, conditions) do
    projects = Repo.all(build_queries(query, conditions))
    {:ok, projects}
  end

  @spec editable(String.t() | integer) :: {:ok, list(Project.t())}
  def editable(user_id) do
    projects =
      from(
        p in Project,
        join: pm in Member,
        where: p.id == pm.project_id and pm.user_id == ^user_id and pm.role > 0 and pm.status == 1
      )
      |> Repo.all()

    {:ok, projects}
  end

  @spec liked_by(String.t() | integer) :: {:ok, list(Project.t())}
  def liked_by(user_id) do
    projects =
      from(
        p in Project,
        join: pl in ProjectLike,
        where: p.id == pl.project_id and pl.user_id == ^user_id and p.status == 1
      )
      |> Repo.all()

    {:ok, projects}
  end

  def create(%{owner_id: owner_id} = attrs) do
    result =
      Multi.new()
      |> Multi.insert(:project, Project.changeset(attrs))
      |> Multi.run(:bulk_create_project_skills, fn %{project: project} ->
        Db.Skills.Skills.bulk_create_project_skills(project.id, 0, attrs[:skill_ids] || [])
      end)
      |> Multi.run(:create_master_project_member, fn %{project: project} ->
        Db.Projects.Member.changeset(%{
          project_id: project.id,
          user_id: owner_id,
          role: :master,
          status: :approved
        })
        |> Repo.insert()
      end)
      |> Repo.transaction()

    case result do
      {:ok, %{project: project}} -> {:ok, project}
      {:error, _title, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec edit(Project.t(), map()) :: {:ok, any()} | {:error, Ecto.Multi.name(), any()}
  def edit(%Project{} = project, attrs) do

    Multi.new()
    |> Multi.update(:project, Project.edit_changeset(project, attrs))
    |> Db.Skills.Skills.bulk_upsert_project_skills(project.id, 0, attrs[:skill_ids] || [])
    |> Repo.transaction()
  end

  @spec edit(integer, %{:project_id => integer, optional(atom) => any}) ::
          {:ok, any()} | {:error, Ecto.Multi.name(), any()} | {:error, :unauthorized}
  def edit(user_id, %{project_id: project_id} = attrs) do

    with %Project{} = project <- Repo.get(Project, project_id),
         {:ok, %{project: project}} <- edit(project, attrs) do

      {:ok, project}
    else
      {:error, _title, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
      nil -> {:error, :unauthorized}
    end
  end

  @spec change_status(Project.t(), %{status: String.t()}) ::
          {:ok, Project.t()} | {:error, String.t()}
  def change_status(%Project{} = project, %{status: "completed"} = attrs) do
    transaction =
      Multi.new()
      |> Multi.update(:update_project, Project.change_status_changeset(project, attrs))
      |> Multi.run(:create_chat, fn _ ->
        Chats.create_chat_group(%{project: project})
      end)
      |> Repo.transaction()

    case transaction do
      {:ok, %{update_project: project}} -> {:ok, project}
      {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  def change_status(%Project{} = project, attrs) do
    case Repo.update(Project.change_status_changeset(project, attrs)) do
      {:ok, project} -> {:ok, project}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec change_status(integer, %{project_id: integer, status: String.t()}) ::
          {:ok, Project.t()} | {:error, String.t()}
  def change_status(user_id, %{project_id: project_id, status: status}) do
    case Repo.get_by(Project, owner_id: user_id, id: project_id) do
      %Project{} = project -> change_status(project, %{status: status})
      nil -> {:error, :unauthorized}
    end
  end

  @spec remove_member_from_project(%{project_id: integer, user_id: integer}) ::
          {:ok, Member.t()} | {:error, any}
  def remove_member_from_project(%{project_id: project_id, user_id: user_id}) do
    case Repo.get_by(Member, project_id: project_id, user_id: user_id) do
      %Member{} = member ->
        Member.delete_changeset(member, %{deleted_at: Timex.now()})
        |> Repo.update()

      _ ->
        {:error, :not_found}
    end
  end

  @spec main_photo(Project.t()) :: Photo.t()
  def main_photo(project) do
    Repo.one(from(p in Photo, where: p.project_id == ^project.id and p.rank == 0))
  end

  @spec preload(Ecto.Queryable.t(), String.t()) :: [Ecto.Schema.t()]
  def preload(query, association) when is_binary(association) do
    Repo.preload(query, [String.to_atom(association)])
  end

  @spec preload(Ecto.Queryable.t(), atom) :: [Ecto.Schema.t()]
  def preload(query, association) when is_atom(association) do
    Repo.preload(query, [association])
  end

  @spec preload(Ecto.Queryable.t(), list(any)) :: [Ecto.Schema.t()]
  def preload(query, associations) when is_list(associations) do
    Repo.preload(query, associations)
  end

  @limit_num 15
  @spec build_queries(Ecto.Queryable.t(), map) :: Ecto.Queryable.t()
  defp build_queries(query, conditions) do
    IO.inspect(conditions)

    queries =
      Enum.reduce(conditions, query, fn
        {:genre_id, genre_id}, queries ->
          from(p in queries, where: p.genre_id == ^genre_id)

        {:skill_ids, skill_ids}, queries ->
          from(
            p in queries,
            join: ps in ProjectSkill,
            where: ps.project_id == p.id and ps.skill_id in ^skill_ids
          )

        {:city_id, city_id}, queries ->
          from(
            p in queries,
            where: p.city_id == ^city_id
          )

        _, queries ->
          queries
      end)
      |> limit(@limit_num)

    from(p in queries, where: p.status == 1)
  end
end
