defmodule ApiWeb.Resolvers.Accounts do
  alias Api.Accounts.Authentication

  def signup(_, %{provider_id: provider_id, uid: uid} = attrs, _) do
    case Authentication.authenticate(attrs) do
      {:ok, token} -> {:ok, %{token: token}}
      {:error, reason} -> {:error, reason}
      _ -> {:error, "invalid access"}
    end
  end

  # def refresh(_, %{refresh_token: refresh_token}, _) do
  #   case Authentication.refresh(refresh_token) do
  #     {:ok, token} -> {:ok, %{token: token}}
  #     {:error, reason} -> {:error, reason}
  #     _ -> {:error, "invalid refresh_token"}
  #   end
  # end

end
