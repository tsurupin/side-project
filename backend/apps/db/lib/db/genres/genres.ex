defmodule Db.Genres.Genres do
  import Ecto.Query, warn: false
  alias Db.Genres.Genre
  alias Db.Repo

  @spec all :: [Genre.t()]
  def all do
    Repo.all(from(g in Genre, where: is_nil(g.deleted_at)))
  end
end
