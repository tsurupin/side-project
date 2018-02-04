defmodule ApiWeb.Resolvers.Accounts do
  alias Api.Accounts

  def login(_, %{provider_id: provider_id, uid: uid}) do
    case Accounts.authenticate(provider_id, uid) do
      {:ok, user} ->
        token = ApiWeb.Authenticate.sign(%{})
        {:ok, %{token: token, user: user}}
      _ ->
        {:error, "invalid access"}
    end
  end
end
