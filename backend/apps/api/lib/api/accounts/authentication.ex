defmodule Api.Accounts.Authentication do
  alias Db.Users.Accounts
  use Guardian, otp_app: :api

  def authenticate(%{provider_id: provider_id, uid: uid} = attrs) do
    with {:ok, user} <- Accounts.get_or_create_user(attrs),
      {:ok, uid, jwt} <- create_token(user.uid)
    do
      {:ok, uid, jwt}
    else
      {:error, reason} -> {:error, reason}
    end

    # JWT encode
    # and return JWT token
    # get uid and auth data
    # try to find user
    # if not create user
    # encode token
    # return token and user_id
  end

  @aud "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit"
  defp create_token(uid) do
    custom_claims = %{
      iss: "email",
      sub: "email",
      aud: @aud,
      iat: "time",
      exp: "time + 30 days"
      uid: uid
    }
    with {:ok, jwt, _full_cliams} Guardian.encode_and_sign(%{uid: uid}, custom_claims),
    do
      {:ok, uid, jwt}
    else
      {:error, reason} -> {:error, reason}
      _ -> {:error, "unknown"}
    end
  end


end
