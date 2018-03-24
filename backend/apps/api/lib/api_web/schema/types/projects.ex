defmodule ApiWeb.Schema.Types.Projects do
  use Absinthe.Schema.Notation
  alias Db.Uploaders.ProjectPhotoUploader
  alias Db.Projects.Photo

  object :project do
    field :id, :id
    field :name, :string
    field :genre, :genre
    field :status, :project_status
    field :owner, :user
    field :lead_sentence, :string
    field :requirement, :string
    field :motivation, :string
    field :updated_at, :native_datetime
    field :skills, list_of(:skill)
    field :photos, list_of(:project_photo)
  end


  object :projects do
    field :projects, list_of(:project)
  end


  enum :project_status do
    value :editing
    value :completed
  end

  object :project_photo do
    field :id, :id
    field :image_url, :string do
      arg :format, :string, default_value: "thumb"
      resolve fn (%Photo{image_url: image_url} = photo, %{format: format}, _) ->
        {:ok, ProjectPhotoUploader.url({image_url, photo}, String.to_atom(format))}
      end
    end
  end

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
