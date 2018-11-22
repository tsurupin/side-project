defmodule Db.Tasks.BootTasks do

  def test do
    IO.inspect("node check: #{Node.get_cookie()}, #{Node.alive?}, #{Node.self()}, #{Node.list()}, #{System.get_env("CONTAINER_PRIVATE_IP")}, #{System.get_env("APP_NAME")}")
  end

  def connect do

    IO.inspect(:net_adm.names)
  
    case Node.connect(:"side_project@ec2-13-57-228-68.us-west-1.compute.amazonaws.com") do
      :ignored -> IO.puts("ignored to connect side_project@10.0.1.50")
      true -> IO.puts("succeeded to connect side_project@10.0.1.50")
      false -> IO.puts("failed to connect side_project@10.0.1.50")
    end

    case Node.connect(:"side_project@ec2-13-56-191-131.us-west-1.compute.amazonaws.com") do
     :ignored -> IO.puts("ignored to connect side_project@10.0.1.166")
      true -> IO.puts("succeeded to connect side_project@10.0.1.166")
      false -> IO.puts("failed to connect side_project@10.0.1.166")
    end

    IO.inspect(Node.list)
    
    IO.inspect("self: #{Node.self}, #{Node.alive?}")
    # # Docker internal DNS lookup
    # IO.puts("lookup result #{System.get_env("AWS_ECS_SERVICE_NAME")}")
    # {string, _} = System.cmd("nslookup", [System.get_env("AWS_ECS_SERVICE_NAME")])

    # IO.puts(
    #   "lookup result #{string}, container_ip:#{System.get_env("CONTAINER_PRIVATE_IP")}, app_name:#{
    #     System.get_env("APP_NAME")
    #   }"
    # )

    # # Fetch IPs from String
    # ips =
    #   Regex.scan(~r/10\.[0-9]\.[0-9]\.\d{1,}/, string)
    #   |> List.flatten()
    #   |> Enum.reject(fn x -> x == System.get_env("CONTAINER_PRIVATE_IP") end)

    # IO.puts("ips #{string}")

    # # Connect to Nodes
    # Enum.map(ips, fn ip ->
    #   Node.connect(:"#{System.get_env("APP_NAME")}@#{ip}")
    # end)
  end
end
