defmodule ApiWeb.Resolvers.Accounts do
  alias Api.Accounts.Authentication

  def signup(_, %{provider_id: provider_id, uid: uid} = attrs, _) do
    IO.inspect(attrs)
    with {:ok, uid, jwt} <- Authentication.authenticate(attrs)
    do
      {:ok, %{uid: uid, token: jwt}}
    else
      {:error, reason} ->
        IO.inspect(reason)
        {:error, reason}
      _ -> {:error, "invalid access"}
    end
  end

  def test(_, _, __) do
    IO.inspect "hogafas"
    {:ok, %Db.Users.User{}}
  end
end

# figure out how to create JWT encode
# figure out how to send fb token through graphql
# figure out how to send token in header in all the requests
