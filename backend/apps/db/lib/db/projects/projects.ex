defmodule Db.Users.Projects do
  @moduledoc """
  The Accoutns context.
  """

  import Ecto.Query, warn: false

  alias Db.Repo
  alias Db.Projects.Project

  @spec get_by(integer) :: map()
  def get_by(%{id: id}) do
    case Repo.get_by(Project, id: id) do
      nil -> {:error, :not_found}
      project -> {:ok, project}
    end
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
