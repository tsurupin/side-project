defmodule Db.OccupationTypes.OccupationTypes do
  alias Db.OccupationTypes.AliveOccupationType
  alias Db.Repo

  @spec all :: [AliveOccupationType.t()]
  def all do
    Repo.all(AliveOccupationType)
  end
end
