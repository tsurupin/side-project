defmodule ApiWeb.Context do
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    #context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: %{})
  end

  defp build_context(conn) do
    %{}
    # with ["Bearer" <> token] <- get_reg_header(conn, "authorization"),
    #       {:ok, data} <- ApiWeb.Authorization.verify(token),
    #       %{} = user <- get_user(data)
    # do
    #   %{current_user: user}
    # else
    #   _ -> %{}
    # end
  end

  defp get_user(%{id: id}) do
    Api.Accounts.lookup(id)
  end
end
