defmodule Api.Guardian.AuthErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, reason}, _opts) do
    IO.inspect(conn)
    IO.inspect(type)
    IO.inspect(reason)
    body = Poison.encode!(%{message: to_string(type)})
    send_resp(conn, 401, body)
  end
end
