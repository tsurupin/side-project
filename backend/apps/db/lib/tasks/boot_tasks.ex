defmodule Db.Tasks.BootTasks do
  def connect do
    # Docker internal DNS lookup
    IO.puts("lookup result #{System.get_env("AWS_ECS_SERVICE_NAME"}")
    {string, _} = System.cmd("nslookup", [Application.get_env(:db, :aws_ecs_service_name)])

    IO.puts(
      "lookup result #{string}, container_ip:#{System.get_env("CONTAINER_IP")}, app_name:#{
        System.get_env("APP_NAME")
      }"
    )

    # Fetch IPs from String
    ips =
      Regex.scan(~r/10\.[0-9]\.[0-9]\.\d{1,}/, string)
      |> List.flatten()
      |> Enum.reject(fn x -> x == System.get_env("CONTAINER_IP") end)

    IO.puts("ips #{string}")

    # Connect to Nodes
    Enum.map(ips, fn ip ->
      Node.connect(:"#{System.get_env("APP_NAME")}@#{ip}")
    end)
  end
end
