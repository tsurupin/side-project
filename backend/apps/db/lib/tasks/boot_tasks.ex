defmodule Db.Tasks.BootTasks do
  def connect do
    # Docker internal DNS lookup
    IO.puts("lookup result #{Application.get_env(:db, :aws_ecs_service_name)}")
    {string, _} = System.cmd("nslookup", [Application.get_env(:db, :aws_ecs_service_name)])
    IO.puts("lookup result #{string}, container_ip:#{System.get_env("CONTAINER_IP")}, app_name:#{Application.get_env(:db, :app_name)}")
    # Fetch IPs from String
    ips =
      Regex.scan(~r/10\.[0-9]\.[0-9]\.\d{1,}/, string)
      |> List.flatten
      |> Enum.reject(
        fn x -> x == System.get_env("CONTAINER_IP")
      end)
      IO.puts("ips #{string}")

    # Connect to Nodes
    Enum.map(ips, fn ip ->
      Node.connect(:"#{Application.get_env(:db, :app_name)}@#{ip}")
    end)
  end
end