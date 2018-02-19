defmodule Api.Accounts.Authentication do
  alias Db.Users.Accounts

  def authenticate(%{provider_id: provider_id, uid: uid} = attrs) do
    with {:ok, user} <- Accounts.get_or_create_user(attrs),
      {:ok, jwt} <- create_token(user)
    do
      {:ok, jwt}
    else
      {:error, reason} -> {:error, reason}
    end
  end

  @aud "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit"
  @one_hour_in_unix 60 * 60
  def create_token(user) do
    current_time = DateTime.to_unix(DateTime.utc_now)
    one_hour_later = current_time + @one_hour_in_unix

    custom_claims = %{
      iss: System.get_env("FIREBASE_SERVICE_ACCOUNT_EMAIL"),
      sub: System.get_env("FIREBASE_SERVICE_ACCOUNT_EMAIL"),
      aud: @aud,
      iat: current_time,
      exp: one_hour_later,
      uid: user.uid
    }

    case Api.Guardian.encode_and_sign(user, custom_claims) do
      {:ok, token, _full_claims} -> {:ok, token}
      {:error, reason} -> {:error, reason}
      _ -> {:error, "unknown error"}
    end
  end

  @certificate Api.Guardian.FirebaseKey.get_key(:public)
  def verify(token) do
    with {:ok, claims } <- Api.Guardian.decode_and_verify(token, %{}, secret: @certificate),
      user <- Accounts.get_by(%{uid: claims["sub"]})
    do
      {:ok, user}
    else
      {:error, :token_expired} -> {:error, :token_expired}
      {:error, :invalid_token} -> IO.inspect("invalid token")
      _ -> IO.inspect("unknown error")
    end
  end

  def refresh(refresh_token) do
    IO.inspect(refresh_token)
  end

  defp active_token?(iop_time) do
    # compare with now
  end
# need to combine public and secret key
# https://github.com/ueberauth/guardian/issues/291
# https://github.com/dvsekhvalnov/jose-jwt/issues/83

end
