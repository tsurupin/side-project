defmodule ApiWeb.UserSocket do
  use Phoenix.Socket

  use Absinthe.Phoenix.Socket, schema: ApiWeb.Schema
  alias Api.Accounts.Authentication
  ## Channels
  # channel "room:*", ApiWeb.RoomChannel

  ## Transports
  transport(:websocket, Phoenix.Transports.WebSocket)
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(%{"token" => token} = attrs, socket) do
    case Authentication.verify(token) do
      {:ok, user} ->
        socket =
          Absinthe.Phoenix.Socket.put_opts(
            socket,
            context: %{
              current_user: user
            }
          )

        {:ok, socket}

      {:error, _} ->
        :error
    end

    # absinthe_config = %{
    #   schema: ApiWeb.Schema
    # }

    # {:ok, assign(socket, :absinthe, absinthe_config)}
  end

  def connect(params, _socket) do
    :error
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     ApiWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
