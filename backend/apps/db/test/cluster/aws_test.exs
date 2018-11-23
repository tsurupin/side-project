defmodule Db.Cluster.AwsTest do
  use ExUnit.Case, async: false
  import Mock

  # test "returnes empty array in case matching to host_name" do
  #   with_mock ExAws, [request: fn(_body) -> {:error, _term} end] do
  #     expected_result = []
  #     assert Db.Cluster.Aws.get_nodes() == []
  #   end
  # end

  # test "returnes node names in case matching to host_name" do
  #   with_mock ExAws, [request: fn(_body) -> {:error, _term} end] do
  #     expected_result = []
  #     assert Db.Cluster.Aws.get_nodes() == []
  #   end
  # end
end
