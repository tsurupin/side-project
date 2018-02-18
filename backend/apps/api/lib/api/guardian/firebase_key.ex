defmodule Api.Guardian.FirebaseKey do
  def get_key(:secret) do
    pem_file("SECRET")
  end

  def get_key(:public) do
    pem_file("PUBLIC")
  end

  defp pem_file(type) do
    JOSE.JWK.from_pem_file(System.get_env("FIREBASE_#{type}_PEM_FILE_PATH"))
  end
end

# send token and max-age to server
# server check whether token is actve and correct
# if stale, refresh token
# if active, access to api
#if login failed request server to create a new token.
#https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=ja

#
