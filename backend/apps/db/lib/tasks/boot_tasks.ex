defmodule Db.Tasks.BootTasks do

  def test do
    IO.inspect("node check: #{Node.get_cookie()}, #{Node.alive?}, #{Node.self()}, #{Node.list()}, #{System.get_env("CONTAINER_PRIVATE_IP")}, #{System.get_env("APP_NAME")}")
  end

  def connect do

    IO.inspect(Node.list)
    
  end
end
