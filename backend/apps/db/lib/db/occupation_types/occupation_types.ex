defmodule Db.OccupationTypes.OccupationTypes do
  import Ecto.Query, warn: false
  alias Db.OccupationTypes.OccupationType
  alias Db.Repo

  @spec all :: [OccupationType.t()]
  def all do
    Repo.all(from(o in OccupationType, where: is_nil(o.deleted_at)))
  end
end
