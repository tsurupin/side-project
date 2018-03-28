defmodule ApiWeb.Schema.Types.Commons do
  use Absinthe.Schema.Notation

  scalar :native_datetime do
    parse fn input ->
      case DateTime.to_iso8601(input.value) do
        {:ok, datetime} -> {:ok, datetime}
        _ -> :error
      end
    end

    serialize &(DateTime.to_iso8601(&1))
  end
end
