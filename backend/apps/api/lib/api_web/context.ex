defmodule ApiWeb.Context do
  @behaviour Plug
  import Plug.Conn
  alias Api.Accounts.Authentication

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  defp build_context(conn) do
    IO.inspect(conn)

    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, user} <- Authentication.verify(token) do
           IO.inspect("authentication is done!!")

      %{current_user: user}
    else
      {:error, :token_expired} -> %{error: :token_expired}
      _ ->
        IO.inspect("unknwon")
        %{}
    end
  end
end
