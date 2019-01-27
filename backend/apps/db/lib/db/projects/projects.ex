defmodule Db.Projects.Projects do
  @moduledoc """
  A context that is responsible for project related data
  """

  import Ecto.Query, warn: false
  alias Ecto.Multi
  alias Db.Repo
  alias Db.Projects.{Project, Member, AliveMember, AliveProject}
  alias Db.Users.{ProjectLike, AliveProjectLike}
  alias Db.Projects.Photo
  alias Db.Skills.{ProjectSkills, ProjectSkill, AliveProjectSkill}
  alias Db.Chats.Chats

  @spec get_by(%{id: integer}) :: {:ok, AliveProject.t()} | {:error, :not_found}
  def get_by(%{id: id}) do
    case Repo.get_by(AliveProject, id: id) do
      %AliveProject{} = project -> {:ok, project}
      nil -> {:error, :not_found}
    end
  end

  def has_liked(%{user_id: user_id, project_id: project_id}) do
    Repo.exists?(
      from(
        p in AliveProject,
        join: pl in AliveProjectLike,
        where:
          pl.project_id == p.id and pl.project_id == ^project_id and pl.user_id == ^user_id and
            pl.status in [^:requested, ^:approved, ^:rejected]
      )
    )
  end

  @spec search(%{conditions: map, user_id: integer}) :: {:ok, [User.t()]} | {:ok, []}
  def search(%{conditions: conditions, user_id: user_id}),
    do: search(%{query: base_search_query(user_id), conditions: conditions})

  @spec search(%{query: Ecto.Queryable.t(), conditions: map}) :: {:ok, [User.t()]} | {:ok, []}
  def search(%{query: query, conditions: conditions}) do
    projects = Repo.all(build_search_queries(query, conditions))
    {:ok, projects}
  end

  @spec editable(integer) :: {:ok, list(AliveProject.t())}
  def editable(user_id) do
    projects =
      editable_by_user(user_id)
      |> Repo.all()

    {:ok, projects}
  end

  @spec liked_by(String.t() | integer) :: {:ok, list(AliveProject.t())}
  def liked_by(user_id) do
    projects =
      from(
        p in AliveProject,
        join: pl in AliveProjectLike,
        where: p.id == pl.project_id and pl.user_id == ^user_id and p.status == ^:completed
      )
      |> Repo.all()

    {:ok, projects}
  end

  @main_photo_rank 0
  @spec main_photo(integer) :: AlivePhoto.t()
  def main_photo(project_id) do
    Repo.one(from(p in AlivePhoto, where: p.project_id == ^project_id and p.rank == ^@main_photo_rank))
  end

  @spec base_search_query(integer) :: Ecto.Queyable.t()
  defp base_search_query(user_id) do
    from(
      p in AliveProject,
      left_join: pl in AliveProjectLike,
      on: pl.project_id == p.id and pl.user_id == ^user_id,
      where: is_nil(pl.id) and p.owner_id != ^user_id
    )
  end

  @spec create(%{owner_id: integer}) :: {:ok, AliveProject.t()} | {:error, String.t()}
  def create(%{owner_id: owner_id} = attrs) do
    transaction =
      Multi.new()
      |> Multi.insert(:project, AliveProject.changeset(attrs))
      |> Multi.merge(fn %{project: project} ->
        ProjectSkills.build_upsert_project_skills_multi(project.id, attrs[:skill_ids] || [])
      end)
      |> Multi.run(:create_master_project_member, fn _repo, %{project: project} ->
        Db.Projects.AliveMember.changeset(%{
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
          |> Multi.update(:project, AliveProject.edit_changeset(project, attrs))
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
    case Repo.get_by(AliveProject, owner_id: user_id, id: project_id) do
      %AliveProject{} = project -> run_change_status(project, %{status: status})
      nil -> {:error, :unauthorized}
    end
  end

  @spec remove_member_from_project(%{project_id: integer, user_id: integer}) ::
          {:ok, Member.t()} | {:error, any}
  def remove_member_from_project(%{project_id: project_id, user_id: user_id}) do
    case Repo.get_by(AliveMember, project_id: project_id, user_id: user_id) do
      %AliveMember{} = member ->
        Repo.update(Member.delete_changeset(member))

      _ ->
        {:error, :not_found}
    end
  end

  @spec editable?(%{project_id: integer, user_id: integer}) ::
          {:ok, true, AliveProject.t()} | {:error, false, :unauthorized}
  defp editable?(%{project_id: project_id, user_id: user_id} = attrs) do
    project =
      editable_by_user(user_id)
      |> by_project(project_id)
      |> Repo.one()

    case project do
      %AliveProject{} -> {:ok, true, project}
      _ -> {:error, false, :unauthorized}
    end
  end

  @spec editable_by_user(integer) :: Ecto.Queryable.t()
  defp editable_by_user(user_id) do
    from(
      p in AliveProject,
      join: pm in AliveMember,
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
            join: ps in AliveProjectSkill,
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

  @spec run_change_status(AliveProject.t(), %{status: String.t()}) ::
          {:ok, AliveProject.t()} | {:error, String.t()}
  defp run_change_status(%AliveProject{} = project, %{status: "completed"} = attrs) do
    transaction =
      Multi.new()
      |> Multi.update(:update_project, AliveProject.change_status_changeset(project, attrs))
      |> Multi.run(:create_chat, fn _repo, _ ->
        Chats.create_chat_group(%{project: project})
      end)
      |> Repo.transaction()

    IO.inspect(transaction)

    case transaction do
      {:ok, %{update_project: project}} -> {:ok, project}
      {:error, _name, changeset, _prev} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end

  defp run_change_status(%AliveProject{} = project, %{status: _} = attrs) do
    case Repo.update(AliveProject.change_status_changeset(project, attrs)) do
      {:ok, project} -> {:ok, project}
      {:error, changeset} -> {:error, Db.FullErrorMessage.message(changeset)}
    end
  end
end
