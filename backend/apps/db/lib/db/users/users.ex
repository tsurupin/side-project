defmodule Db.Users.Users do
  @moduledoc """
  The Accoutns context.
  """

  import Ecto.Query, warn: false

  alias Db.Repo
  alias Db.Users.User

  def get_by(%{id: id}) do
    Repo.get_by(User, id: id)
  end

  def assoc(query, association) when is_binary(association) do
    Ecto.assoc(query, [String.to_atom(association)])
  end

  def assoc(query, association) when is_atom(association) do
    Ecto.assoc(query, [association])
  end
  
  def assoc(query, associations) when is_list(associations) do
    Ecto.assoc(query, associations)
  end
end
