defmodule ApiWeb.HealthController do
  use ApiWeb, :controller

  def health(conn, _params) do
    Db.Tasks.BootTasks.connect()
    text(conn, "ok")
  end
end
