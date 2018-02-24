defmodule Api.Guardian.FirebaseKey do
  def get_key(:secret) do
    JOSE.JWK.from_pem_file(System.get_env("FIREBASE_SECRET_PEM_FILE_PATH"))
  end

  def get_key(:public, kid) do
    JOSE.JWK.from_pem_file("#{System.get_env("FIREBASE_PUBLIC_PEM_FOLDER_PATH")}/#{kid}.pem")
  end

  defp pem_file(type) do
    JOSE.JWK.from_pem_file(System.get_env("FIREBASE_#{type}_PEM_FILE_PATH"))
  end
end
