defmodule ApiWeb.Resolvers.Comments do
  alias Api.Accounts.Authentication

  def submit_comment(_, fields, _) do
    IO.inspect(fields)
    {:ok, %{channel: "hoge", content: "content"}}
  end
end
