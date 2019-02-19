defmodule Db.Chats.Subject do
  @moduledoc """
  A struct representing chat subject
  """

  use TypedStruct

  @typedoc "subject"
  typedstruct do
    field(:id, integer(), enforce: true)
    field(:name, String.t(), enforce: true)
    field(:source_type, String.t(), enforce: true)
    field(:photo, any())
  end
end
