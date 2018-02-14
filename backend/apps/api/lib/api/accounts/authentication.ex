defmodule Api.Accounts.Authentication do
  alias Db.Users.Accounts

  def authenticate(%{provider_id: provider_id, uid: uid} = attrs) do
    with {:ok, user} <- Accounts.get_or_create_user(attrs),
      {:ok, uid, jwt} <- create_token(user)
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
  @one_month_in_unix 60 * 60 * 24 * 30
  def create_token(user) do
    current_time = DateTime.to_unix(DateTime.utc_now)
    thirty_days_later = current_time + @one_month_in_unix
    custom_claims = %{
      iss: System.get_env("AUTH_EMAIL"),
      sub: System.get_env("AUTH_EMAIL"),
      aud: @aud,
      iat: current_time,
      exp: thirty_days_later,
      uid: user.uid
    }

    with {:ok, jwt, _full_cliams} <- Api.Guardian.encode_and_sign(user, custom_claims)
    do
      {:ok, user.uid, jwt}
    else
      {:error, reason} -> {:error, reason}
      _ -> {:error, "unknown"}
    end
  end


end
