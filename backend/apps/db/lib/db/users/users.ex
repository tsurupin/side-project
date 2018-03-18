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

  def preload(query, association) when is_binary(association) do
    Repo.preload(query, [String.to_atom(association)])
  end

  def preload(query, association) when is_atom(association) do
    Repo.preload(query, [association])
  end

end
