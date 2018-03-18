defmodule ApiWeb.Schema.Resolvers.User do
  alias Db.Users.Users
  def call(_, %{id: id}, _) do
    IO.inspect(id)
    case Users.get_by(%{id: id}) do
      nil ->
        {:error, %{reason: "Not found"}}
      %Db.Users.User{} = usr ->
        IO.inspect(usr)
        user =
          usr
          |> Users.preload(:photos)
          |> Users.preload(:skills)
        IO.inspect(user)
      {:ok, %{
          user: user,
          skills: user.skills,
          photos: user.photos
        }
      }
    end
  end
end
