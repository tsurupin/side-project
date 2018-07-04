defmodule Db.Genres.Genres do
  alias Db.Genres.Genre
  alias Db.Repo

  @spec all :: [Genre.t()]
  def all do
    Repo.all(Genre)
  end
end
