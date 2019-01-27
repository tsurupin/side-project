defmodule Db.Genres.Genres do
  alias Db.Genres.AliveGenre
  alias Db.Repo

  @spec all :: [AliveGenre.t()]
  def all do
    Repo.all(AliveGenre)
  end
end
