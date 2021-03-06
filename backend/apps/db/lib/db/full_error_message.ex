defmodule Db.FullErrorMessage do
  @moduledoc """
  Combine changeset errors into error message
  """
  import Ecto.Changeset, only: [traverse_errors: 2]

  @spec message(Ecto.Changeset.t()) :: String.t()
  def message(%Ecto.Changeset{} = changeset) do
    traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
    |> Enum.map(fn {key, value} -> "#{key}: #{value}" end)
    |> Enum.join("\n")
  end

  def message(changeset), do: changeset
end
