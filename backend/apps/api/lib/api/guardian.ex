defmodule Api.Guardian do
  use Guardian, otp_app: :api

  @spec subject_for_token(map(), map()) :: {:ok, String.t()}
  def subject_for_token(_resource, claims) do
    {:ok, claims["sub"]}
  end

  @spec resource_from_claims(map()) :: {:error, atom}
  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end
