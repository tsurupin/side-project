defmodule ApiWeb.Schema.Resolvers.Users do
  alias Db.Users.{Users, Photos}
  alias Db.Genres.Genres
  alias Db.OccupationTypes.OccupationTypes
  alias Api.Accounts.Authentication

  def sign_up(_, %{provider_id: _provider_id, uid: _uid} = attrs, _) do
    case Authentication.authenticate(attrs) do
      {:ok, token} -> {:ok, %{token: token}}
      {:error, reason} -> {:error, reason}
      _ -> {:error, "invalid access"}
    end
  end

  def edit(_, %{user_input: user_input}, %{context: %{current_user: current_user}}) do
    case Users.edit(current_user, user_input) do
      {:ok, %{user: user}} ->
        user = Users.preload(user, [:photos, :skills, :city, :genre, :occupation_type])
        {:ok, user}

      {:error, reason} ->
        {:error, reason}
    end
  end

  def fetch_profile(_, %{id: id}, _) do
    case Users.get_by(%{id: id}) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}

      {:ok, user} ->
        user = Users.preload(user, [:photos, :skills, :city, :genre, :occupation_type])
        {:ok, user}
    end
  end

  def fetch_current_user(_, _, %{context: %{current_user: current_user}}) do
    user = Users.preload(current_user, [:photos, :skills, :city, :genre, :occupation_type])
    {:ok, user}
  end

  def search(_ctx, %{conditions: conditions}, _) do
    case Users.search(conditions) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}

      {:ok, users} ->
        users = Users.preload(users, [:photos, :occupation_type, :city, :genre])
        {:ok, users}
    end
  end

  def fetch_search_form(_, _, _) do
    genres = Genres.all
    occupation_types = OccupationTypes.all
    {:ok, %{genres: genres, occupation_types: occupation_types}}
  end

  def upload_photo(ctx, %{user_upload_input: attrs}, %{
        context: %{current_user: current_user}
      }) do
    case Photos.upload_photo(current_user, attrs) do
      {:ok, photo} -> {:ok, photo}
      {:error, reason} -> {:error, reason}
    end
  end

  def delete_photo(_ctx, %{photo_id: photo_id}, %{context: %{current_user: current_user}}) do
    case Photos.delete_photo(photo_id) do
      {:ok, %{deleted_photo: photo}} -> {:ok, photo}
      {:error, reason} -> {:error, reason}
    end
  end
end
