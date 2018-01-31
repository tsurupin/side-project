defmodule SideProjectTest do
  use ExUnit.Case
  doctest SideProject

  test "greets the world" do
    assert SideProject.hello() == :world
  end
end
