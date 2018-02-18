defmodule ApiWeb.Context do
  @behaviour Plug
  import Plug.Conn
  alias Api.Accounts.Authentication

  def init(opts), do: opts

  def call(conn, _) do
    IO.inspect(conn)
    IO.inspect("------------------")
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  defp build_context(conn) do
     #MyApp.Guardian.decode_and_verify(token)
    # case Guardian.Plug.current_resource(conn) do
    #  nil -> conn
    #  user -> {:current_user, user}
    # end
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
        {:ok, user} <- Authentication.verify(token)
    do
      %{current_user: user}
    else
      {:error, :expired} -> %{expired: True}
      _ -> %{}
    end
  end

end
