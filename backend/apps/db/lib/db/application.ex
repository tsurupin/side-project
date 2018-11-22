defmodule Db.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    topologies = [
      example: [
        strategy: Cluster.Strategy.Epmd,
        config: [hosts: [:"side_project@10.0.1.34", :"side_project@10.0.0.90", :"side_project@10.0.1.166"]],
      ]
    ]
    

    #IO.inspect(:net_adm.host_file())
    #:net_adm.world()
    # case :net_adm.world() do
    #   {:ok, _} -> nil
    #   {:error, reason} -> IO.puts(reason)
    # end
    #IO.inspect(Node.list())

    # List all child processes to be supervised
    children = [
      {Cluster.Supervisor, [topologies, [name: MyApp.ClusterSupervisor]]},
      supervisor(Db.Repo, [])
    ]

   

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Db.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
