defmodule Api.Guardian do
  use Guardian, otp_app: :api

  def subject_for_token(resource, claims) do
    {:ok, claims["sub"]}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end
