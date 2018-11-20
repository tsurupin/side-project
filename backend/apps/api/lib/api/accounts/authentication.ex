defmodule Api.Accounts.Authentication do
  @moduledoc """
    The authentication context
  """
  alias Db.Users.{Accounts, User}

  def authenticate(%{provider_id: _provider_id, uid: _uid} = attrs) do
    with {:ok, user} <- Accounts.get_or_create_user(attrs),
         {:ok, jwt} <- create_token(user) do
      {:ok, jwt}
    else
      {:error, reason} -> {:error, reason}
    end
  end

  @aud "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit"
  @one_hour_in_unix 60 * 60
  @spec create_token(User.t()) :: {:ok, String.t()} | {:error, String.t()}
  def create_token(user) do
    current_time = DateTime.to_unix(DateTime.utc_now())
    one_hour_later = current_time + @one_hour_in_unix

    custom_claims = %{
      iss: System.get_env("FIREBASE_SERVICE_ACCOUNT_EMAIL"),
      sub: System.get_env("FIREBASE_SERVICE_ACCOUNT_EMAIL"),
      aud: @aud,
      iat: current_time,
      exp: one_hour_later,
      uid: user.uid
    }

    IO.inspect(user)
    IO.inspect(custom_claims)

    case Api.Guardian.encode_and_sign(user, custom_claims) do
      {:ok, token, _full_claims} ->
        {:ok, token}

      {:error, reason} ->
        IO.inspect(reason)
        {:error, reason}
    end
  end

  @spec verify(String.t()) :: {:ok, User.t()} | {:error, :atom}
  def verify(token) do
    with {:ok, public_key} <- get_public_key(token),
         {:ok, claims} = Api.Guardian.decode_and_verify(token, %{}, secret: public_key) do
      user = Accounts.get_by(%{uid: claims["sub"]})
      {:ok, user}
    else
      {:error, :token_expired} -> {:error, :token_expired}
      {:error, :invalid_token} -> {:error, :invalid_token}
      _ -> {:error, :unknown_error}
    end
  end

  @spec get_public_key(String.t()) :: {:ok, String.t()} | {:ok, :no_public_key} | {:ok, :no_kid}
  defp get_public_key(token) do
    ## NOTE: cache public_key
    with %{headers: %{"kid" => kid}} <- Api.Guardian.peek(token),
         {:ok, public_key} <- get_secret(kid) do
      {:ok, public_key}
    else
      {:error, :no_public_key} -> {:ok, :no_public_key}
      _ -> {:ok, :no_kid}
    end
  end

  @spec get_secret(String.t()) :: {:ok, any()} | {:error, String.t()}
  defp get_secret(kid) do
    with {:ok, cert} <- get_google_cert(kid),
         {:ok, path} <- Briefly.create(extname: ".pem") do
      File.write(path, cert)
      secret = Api.Guardian.FirebaseKey.get_key(:public, path)
      {:ok, secret}
    else
      {:error, "cert was not found"} -> {:error, "cert was not found"}
      _ -> {:error, "secret was not created"}
    end
  end

  @google_cert_url "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
  @spec get_google_cert(String.t()) :: {:ok, any} | {:error, String.t()}
  defp get_google_cert(kid) do
    with {:ok, http} <- HTTPoison.get(@google_cert_url),
         {:ok, data} <- Poison.decode(http.body),
         {:ok, cert} <- Map.fetch(data, kid) do
      {:ok, cert}
    else
      _ -> {:error, "cert was not found"}
    end
  end
end
