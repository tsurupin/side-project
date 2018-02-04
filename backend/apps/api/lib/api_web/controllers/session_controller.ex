defmodule ApiWeb.SessionController do
  use ApiWeb, :controller
  use Absinthe.Phoenix.Controller, schema: ApiWeb.Schema

  @graphql """
  mutation ($token: String!, $provider_id: String!, $uid: String!) {
    login(token: $token, provider_id: $provider_id, uid: $uid)
  }
  """


end
