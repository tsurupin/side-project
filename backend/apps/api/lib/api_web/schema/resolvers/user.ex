defmodule ApiWeb.Schema.Resolvers.User do
  alias Db.Users.Users

  def call(_, %{id: id}, _) do
    case Users.get_by(%{id: id}) do
      {:ok, user} ->
        user
        |> User.assoc([:photos, :skills])
      {:ok, %{
          user: user,
          skills: user.skills,
          photos: user.photos
        }
      }
      {:error, reason} ->
        {:error, %{reason: reason}}
    end
  end
end
