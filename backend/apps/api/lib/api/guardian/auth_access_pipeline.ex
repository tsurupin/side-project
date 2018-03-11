defmodule Api.Guardian.AuthAccessPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :api,
    module: Api.Guardian

  # error_handler: Api.Guardian.AuthErrorHandler

  plug(Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}, allow_blank: true)
  # plug Guardian.Plug.EnsureAuthenticated
  plug(Guardian.Plug.LoadResource, allow_blank: true)
end
