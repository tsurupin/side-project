defmodule ApiWeb.Schema.Resolvers.Favorites do
  alias Db.Users.UserFavorite
  alias Db.Users.Users

  # def fetch(_ctx, %{}, %{context: %{current_user: current_user}}) do
  #   case Users.get_favorites(current_user.id) do
  #     {:ok, favorites} ->
  #       favorites = Users.preload(favorites, [:user, :target_user, :target_project])
  #       {:ok, favorites}
  #   end
  # end

  # def fetch_profile(_, %{id: id}, _) do
  #   case Users.get_by(%{id: id}) do
  #     {:error, :not_found} ->
  #       {:error, %{reason: "Not Found"}}

  #     {:ok, user} ->
  #       user = Users.preload(user, [:photos, :skills, :country, :genre, :occupation_type])
  #       {:ok, user}
  #   end
  # end
  #
  # def search(_ctx, %{conditions: conditions}, _) do
  #   case Users.search(conditions) do
  #     {:error, :not_found} ->
  #       {:error, %{reason: "Not Found"}}

  #     {:ok, users} ->
  #       users = Users.preload(users, [:photos, :occupation_type, :genre])
  #       {:ok, users}
  #   end
  # end
end
