defmodule Db.Helpers.SoftDeletion do

  defmacro __using__(_params) do
    quote do
      import Ecto.Changeset

      @permitted_attrs ~w(deleted_at)a
      @spec delete_changeset(any) :: Ecto.Changeset.t()
      def delete_changeset(model) do

        model
        |> cast(%{},@permitted_attrs)
        |> set_deleted_at
      end

      @spec set_deleted_at(Ecto.Changeset.t()) :: Ecto.Changeset.t()
      defp set_deleted_at(changeset) do
        force_change(changeset, :deleted_at, DateTime.truncate(DateTime.utc_now, :second))
      end
    end
  end
end

