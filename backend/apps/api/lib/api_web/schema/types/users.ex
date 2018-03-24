defmodule ApiWeb.Schema.Types.Users do
  use Absinthe.Schema.Notation
  alias Db.Uploaders.UserPhotoUploader
  alias Db.Users.Photo

  enum :status do
    value :not_compeleted
    value :completed
    value :unactive
  end

  object :user do
    field :id, :id
    field :display_name, :string
    field :genre, :genre
    field :occupation_type, :occupation_type
    field :school_name, :string
    field :status, :status
    field :area_name, :string
    field :country, :country
    field :skills, list_of(:skill)
    field :photos, list_of(:photo)
  end

  object :photo do
    field :id, :id
    field :image_url, :string do
      arg :format, :string, default_value: "thumb"
      resolve fn (%Photo{image_url: image_url} = photo, %{format: format}, _) ->
        {:ok, UserPhotoUploader.url({image_url, photo}, String.to_atom(format))}
      end
    end

  end


end
