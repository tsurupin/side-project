defmodule SideProjectWeb.PageController do
  use SideProjectWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
