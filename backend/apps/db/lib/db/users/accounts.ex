defmodule Db.Users.Accounts do
  @moduledoc """
  The Accoutns context.
  """

  import Ecto.Query, warn: false

  alias Db.Repo
  alias Db.Users.User

  def get_or_create_user(%{provider_id: provider_id, uid: uid}) do
    case get_user(provider_id, uid) do
      {:ok, user} ->
        {:ok, user}
      _ ->
        create_user(%{provider_id: provider_id, uid: uid})
    end
  end

  def get_user(provider_id, uid) do
    Repo.get_by(User, provider_id: provider_id, uid: uid)
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

end
