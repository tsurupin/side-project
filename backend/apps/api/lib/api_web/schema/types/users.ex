defmodule ApiWeb.Schema.Types.Users do
  use Absinthe.Schema.Notation
  alias Db.Uploaders.UserPhotoUploader
  alias Db.Users.Photo
  alias Db.Users.Users

  object :user do
    field :id, :id
    field :uid, :string
    field :token, :string
    field :display_name, :string
    field :genre, :genre
    field :occupation_type, :occupation_type
    field :school_name, :string
    field :company_name, :string
    field :introduction, :string
    field :status, :user_status
    field :area_name, :string
    field :country, :country
    field :skills, list_of(:skill)
    field :photos, list_of(:user_photo)
    field :main_photo_url, :string, resolve: fn(_, %{source: user}) ->
      case Users.main_photo(user) do
        %Photo{image_url: image_url} = photo ->
          {:ok, UserPhotoUploader.url({image_url, photo}, :thumb)}
        _ -> {:ok, nil}
      end
    end
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

  object :token do
    field(:token, :string)
  end

  enum :user_status do
    value :not_compeleted
    value :completed
    value :unactive
  end

  input_object :user_search_conditions do
    field :occupation_type_id, :integer
    field :distance, :integer
    field :genre_id, :integer
    field :is_active, :boolean
    field :skill_ids,  list_of(:integer)
  end

  input_object :user_inut do
    field :dislay_name, :string
    field :introduction, :string
    field :occupation, :string
    field :school_name, :string
    field :company_name, :string
    field :occupation_type_id, :integer
    field :skill_ids, list_of(:integer)
    field :genre_id, :integer
    field :latitude, :float
    field :longitude, :float
  end

end
