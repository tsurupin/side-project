defmodule Api.Guardian.FirebaseKey do
  def get_key(:secret) do
    get_key(System.get_env("FIREBASE_SECRET_PEM_FILE_PATH"))
  end

  def get_key(:public, path) do
    get_key(path)
  end

  def get_key(path) do
    JOSE.JWK.from_pem_file(path)
  end

end
