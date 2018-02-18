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
  end

  @aud "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit"
  @one_hour_in_unix 60 * 60
  def create_token(user) do
    #IO.inspect(user.uid)
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
    #IO.inspect(custom_claims)

    with {:ok, jwt, full_claims} <- Api.Guardian.encode_and_sign(user, custom_claims)
    do
      {:ok, user.uid, jwt}
    else
      {:error, reason} -> {:error, reason}
      _ -> {:error, "unknown"}
    end
  end

  @certificate Api.Guardian.FirebaseKey.get_key(:public)
  def verify(token) do
    with {:ok, claims } <- Api.Guardian.decode_and_verify(token, %{}, secret: @certificate),
      {:ok} <- active_token?(claims["exp"])
      {:ok, user} <- Accounts.get_by(%{uid: claims["sub"]})
    do
      {:ok, user}
    else
      {:error, :expired} -> {:error, :expired}
      _ -> IO.inspect("error")
    end
  end

  defp active_token?(iop_time) do
    # compare with now
  end
# need to combine public and secret key
# https://github.com/ueberauth/guardian/issues/291
# https://github.com/dvsekhvalnov/jose-jwt/issues/83

end
