defmodule ApiWeb.Schema.Resolvers.Users do
  alias Db.Users.Users

  def fetch_profile(_, %{id: id}, _) do
    case Users.get_by(%{id: id}) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}
      {:ok, user} ->
        user = Users.preload(user, [:photos, :skills, :country, :genre, :occupation_type])
        {:ok, user}
    end
  end

  def search(ctx, %{conditions: conditions}, _) do
    IO.inspect(ctx)
    IO.inspect(conditions)

    case Users.search(conditions) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}
      {:ok, users} ->
        users = Users.preload(users, [:photos, :occupation_type, :genre])
        {:ok, users}
    end
  end

end
