defmodule Db.Users.Accounts do
  @moduledoc """
  A context that is responsible for login/signup
  """

  import Ecto.Query, warn: false

  alias Db.Repo
  alias Db.Users.User

  @spec get_or_create_user(%{provider_id: String.t(), uid: String.t()}) ::
          {:ok, User.t()} | {:error, Ecto.Changeset.t()}
  def get_or_create_user(%{provider_id: provider_id, uid: uid}) do
    case get_user(provider_id, uid) do
      %User{} = user -> {:ok, user}
      _ -> create_user(%{provider_id: provider_id, uid: uid})
    end
  end

  @spec get_user(String.t(), String.t()) :: User.t() | no_return
  def get_user(provider_id, uid) do
    Repo.get_by(User, provider_id: provider_id, uid: uid)
  end

  @spec get_by(%{uid: String.t()}) :: User.t() | no_return
  def get_by(%{uid: uid}) do
    Repo.get_by(User, uid: uid)
  end

  @spec create_user(%{provider_id: String.t(), uid: String.t()}) ::
          {:ok, User.t()} :: {:error, Ecto.Changeset.t()}
  def create_user(%{provider_id: _provider_id, uid: _uid} = attrs) do
    User.changeset(attrs)
    |> Repo.insert()
  end
end
