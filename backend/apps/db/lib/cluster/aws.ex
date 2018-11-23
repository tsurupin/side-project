defmodule Db.Cluster.Aws do
  @moduledoc """
  """
  import SweetXml
  @public_dns_xms_path "////DescribeInstancesResponse/reservationSet/item/instancesSet/item/dnsName"
  
  @doc """

  """
  
  @spec get_nodes() :: [String.t()] | []
  def get_nodes() do 
    get_dns_names()
    |> Enum.map(&node_name(&1))
  end

  @spec get_dns_names() :: [String.t()] | [] 
  defp get_dns_names() do
    case request() do
      {:ok, %{body: body}} -> body |> xpath(~x"#{@public_dns_xms_path}/text()"ls)
      _ -> []
    end
  end

  @app_name System.get_env("APP_NAME")
  @spec node_name(String.t()) :: Atom.t()
  defp node_name(host_name), do: :"#{@app_name}@#{host_name}"
  
  @spec request() :: {:ok, term} | {:error, term}
  defp request() do
    ExAws.EC2.describe_instances([filters: ["key-name": System.get_env("AWS_ECS_INSTANCE_TAG_NAME")]])
    |> ExAws.request
  end

  
end