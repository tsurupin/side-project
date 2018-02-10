defmodule ApiWeb.Resolvers.Accounts do
  alias Api.Accounts

  def signup(_, %{provider_id: provider_id, uid: uid}) do
    with {:ok, uid, jwt} <- Accounts.Authenntication.authenticate(%{provider_id: provider_id, uid: uid}),
    do
      {:ok, uid, jwt}
    else
      {:error, reason} -> {:error, reason}
      _ -> {:error, "invalid access"}
    end
  end
end

# figure out how to create JWT encode
# figure out how to send fb token through graphql
# figure out how to send token in header in all the requests
