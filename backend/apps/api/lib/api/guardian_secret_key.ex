defmodule Api.GuardianSecretKey do
  def get_key() do
    JOSE.JWK.from_pem_file(System.get_env("SECRET_PEM_FILE_PATH"))
  end
end
