defmodule ApiWeb.Schema.Types.Users do
  use Absinthe.Schema.Notation
  alias Db.Uploaders.UserPhotoUploader
  alias Db.Users.Photo


  object :user do
    field :id, :id
    field :display_name, :string
    field :genre, :genre
    field :occupation_type, :occupation_type
    field :school_name, :string
    field :status, :user_status
    field :area_name, :string
    field :country, :country
    field :skills, list_of(:skill)
    field :photos, list_of(:user_photo)
  end

  object :user_photo do
    field :id, :id
    field :image_url, :string do
      arg :format, :string, default_value: "thumb"
      resolve fn (%Photo{image_url: image_url} = photo, %{format: format}, _) ->
        {:ok, UserPhotoUploader.url({image_url, photo}, String.to_atom(format))}
      end
    end
  end

  enum :user_status do
    value :not_compeleted
    value :completed
    value :unactive
  end

end
