defmodule Db.CustomUpload do
  @typedoc """
      Custom Upload type of which type is same as %Plug.Upload
  """

  defstruct [:content_type, :filename, :path]

  @type t :: %Db.CustomUpload{
          content_type: binary() | nil,
          filename: binary(),
          path: Path.t()
        }

  @type t(content_type, filename, path) ::
          t :: %Db.CustomUpload{content_type: content_type, filename: filename, path: path}
end
