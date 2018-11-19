defmodule ApiWeb.HealthController do
  use ApiWeb, :controller

  def health(conn, _params) do
    text(conn, "ok")
  end
end
