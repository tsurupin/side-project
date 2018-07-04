defmodule Db.OccupationTypes.OccupationTypes do
  alias Db.OccupationTypes.OccupationType
  alias Db.Repo

  @spec all :: [OccupationType.t()]
  def all do
    Repo.all(OccupationType)
  end
end
