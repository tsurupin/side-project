defmodule Db.Projects.Projects do
  @moduledoc """
  A context that is responsible for project related data
  """

  import Ecto.Query, warn: false
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Projects.{Project, Member}
  alias Db.Users.{ProjectLike}
  alias Db.Projects.Photo
  alias Db.Skills.{ProjectSkills, ProjectSkill}
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
    projects = Repo.all(build_search_queries(query, conditions))
    {:ok, projects}
  end

  @spec editable(integer) :: {:ok, list(Project.t())}
  def editable(user_id) do
    projects =
      editable_by_user(user_id)
      |> Repo.all()

    {:ok, projects}
  end

  @spec liked_by(String.t() | integer) :: {:ok, list(Project.t())}
  def liked_by(user_id) do
    projects =
      from(
        p in Project,
        join: pl in ProjectLike,
        where: p.id == pl.project_id and pl.user_id == ^user_id and p.status == ^:completed
      )
      |> Repo.all()

    {:ok, projects}
  end

  @main_photo_rank 0
  @spec main_photo(integer) :: Photo.t()
  def main_photo(project_id) do
    Repo.one(from(p in Photo, where: p.project_id == ^project_id and p.rank == ^@main_photo_rank))
  end

  @spec create(%{owner_id: integer}) :: {:ok, Project.t()} | {:error, String.t()}
  def create(%{owner_id: owner_id} = attrs) do
    transaction =
      Multi.new()
      |> Multi.insert(:project, Project.changeset(attrs))
      |> Multi.merge(fn %{project: project} ->
        ProjectSkills.build_upsert_project_skills_multi(project.id, attrs[:skill_ids] || [])
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

    case transaction do
      {:ok, %{project: project}} -> {:ok, project}
      {:error, _title, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  @spec edit(integer, %{:project_id => integer, optional(atom) => any}) ::
          {:ok, any()} | {:error, Ecto.Multi.name(), any()} | {:error, :unauthorized}
  def edit(user_id, %{project_id: project_id} = attrs) do
    case editable?(%{project_id: project_id, user_id: user_id}) do
      {:error, false, :unauthorized} ->
        {:error, :unauthorized}

      {:ok, true, project} ->
        transaction =
          Multi.new()
          |> Multi.update(:project, Project.edit_changeset(project, attrs))
          |> Multi.merge(fn _ ->
            ProjectSkills.build_upsert_project_skills_multi(project.id, attrs[:skill_ids] || [])
          end)
          |> Repo.transaction()

        case transaction do
          {:ok, %{project: project}} -> {:ok, project}
          {:error, _title, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
        end
    end
  end

  @spec change_status(integer, %{project_id: integer, status: String.t()}) ::
          {:ok, Project.t()} | {:error, String.t()}
  def change_status(user_id, %{project_id: project_id, status: status}) do
    case Repo.get_by(Project, owner_id: user_id, id: project_id) do
      %Project{} = project -> run_change_status(project, %{status: status})
      nil -> {:error, :unauthorized}
    end
  end

  @spec remove_member_from_project(%{project_id: integer, user_id: integer}) ::
          {:ok, Member.t()} | {:error, any}
  def remove_member_from_project(%{project_id: project_id, user_id: user_id}) do
    case Repo.get_by(Member, project_id: project_id, user_id: user_id) do
      %Member{} = member ->
        Member.delete_changeset(member, %{deleted_at: NaiveDateTime.utc_now})
        |> Repo.update()

      _ ->
        {:error, :not_found}
    end
  end


  @spec editable?(%{project_id: integer, user_id: integer}) ::
          {:ok, true, Project.t()} | {:error, false, :unauthorized}
  defp editable?(%{project_id: project_id, user_id: user_id} = attrs) do
    project =
      editable_by_user(user_id)
      |> by_project(project_id)
      |> Repo.one()

    case project do
      %Project{} -> {:ok, true, project}
      _ -> {:error, false, :unauthorized}
    end
  end

  @spec editable_by_user(integer) :: Ecto.Queryable.t()
  defp editable_by_user(user_id) do
    from(
      p in Project,
      join: pm in Member,
      where:
        p.id == pm.project_id and pm.user_id == ^user_id and pm.role in [^:admin, ^:master] and
          pm.status == ^:approved
    )
  end

  @spec by_project(Ecto.Queryable.t(), integer) :: Ecto.Queryable.t()
  defp by_project(query, project_id) do
    from(
      p in query,
      where: p.id == ^project_id
    )
  end

  @limit_num 15
  @spec build_search_queries(Ecto.Queryable.t(), map) :: Ecto.Queryable.t()
  defp build_search_queries(query, conditions) do
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

    from(p in queries, where: p.status == ^:completed)
  end

  @spec run_change_status(Project.t(), %{status: String.t()}) ::
          {:ok, Project.t()} | {:error, String.t()}
  defp run_change_status(%Project{} = project, %{status: "completed"} = attrs) do
    transaction =
      Multi.new()
      |> Multi.update(:update_project, Project.change_status_changeset(project, attrs))
      |> Multi.run(:create_chat, fn _ ->
        Chats.create_chat_group(%{project: project})
      end)
      |> Repo.transaction()

    IO.inspect(transaction)

    case transaction do
      {:ok, %{update_project: project}} -> {:ok, project}
      {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  defp run_change_status(%Project{} = project, %{status: _} = attrs) do
    case Repo.update(Project.change_status_changeset(project, attrs)) do
      {:ok, project} -> {:ok, project}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end
end
