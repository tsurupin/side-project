defmodule Db.Projects.Projects do
  @moduledoc """
  The Accoutns context.
  """

  import Ecto.Query, warn: false

  alias Db.Repo
  alias Db.Projects.Project
  alias Db.Projects.Photo

  @spec get_by(integer) :: map()
  def get_by(%{id: id}) do
    case Repo.get_by(Project, id: id) do
      nil -> {:error, :not_found}
      project -> {:ok, project}
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

end
