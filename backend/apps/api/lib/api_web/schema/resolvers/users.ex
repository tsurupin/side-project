defmodule ApiWeb.Schema.Resolvers.Users do
  alias Db.Users.Users
  alias Api.Accounts.Authentication

  def signup(_, %{provider_id: _provider_id, uid: _uid} = attrs, _) do
    case Authentication.authenticate(attrs) do
      {:ok, token} -> {:ok, %{token: token}}
      {:error, reason} -> {:error, reason}
      _ -> {:error, "invalid access"}
    end
  end

  def edit(_, %{user_input: user_input}, %{context: %{current_user: current_user}}) do

     case Users.edit(current_user, user_input) do
       {:ok, _user} -> {:ok, true}
       {:error, reason} -> {:error, reason}
     end
  end

  def fetch_profile(_, %{id: id}, _) do
    case Users.get_by(%{id: id}) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}
      {:ok, user} ->
        user = Users.preload(user, [:photos, :skills, :country, :genre, :occupation_type])
        {:ok, user}
    end
  end

  def search(_ctx, %{conditions: conditions}, _) do

    case Users.search(conditions) do
      {:error, :not_found} ->
        {:error, %{reason: "Not Found"}}
      {:ok, users} ->
        users = Users.preload(users, [:photos, :occupation_type, :genre])
        {:ok, users}
    end
  end

  def upload_image(_ctx, %{image: image, is_main: is_main}, %{context: %{current_user: current_user}}) do
    case Users.upload_image(current_user, image, is_main) do
      {:ok, true} -> {:ok, true}
      {:error, reason} -> {:error, reason}
    end
  end

  def remove_image(_ctx, %{image_id: image_id}, %{context: %{current_user: current_user}}) do
    case Users.remove_image(current_user, image_id) do
      {:ok, true} -> {:ok, true}
      {:error, reason} -> {:error, reason}
    end
  end

end
