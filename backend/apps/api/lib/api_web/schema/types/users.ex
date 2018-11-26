defmodule ApiWeb.Schema.Types.Users do
  use Absinthe.Schema.Notation
  alias Db.Uploaders.UserPhotoUploader
  alias Db.Users.Photo
  alias Db.Users.Users

  object :user do
    field(:id, :id)
    field(:uid, :string)
    field(:token, :string)
    field(:display_name, :string)
    field(:genre, :genre)
    field(:occupation_type, :occupation_type)
    field(:occupation, :string)
    field(:school_name, :string)
    field(:company_name, :string)
    field(:introduction, :string)
    field(:status, :user_status)
    field(:city, :city)
    field(:skills, list_of(:skill))
    field(:photos, list_of(:user_photo))

    field(
      :main_photo_url,
      :string,
      resolve: fn _, %{source: user} ->
        case Users.main_photo(user.id) do
          %Photo{image_url: image_url} = photo ->
            {:ok, UserPhotoUploader.url({image_url, photo}, :thumb)}

          _ ->
            IO.inspect("unknown")
            {:ok, UserPhotoUploader.missing_url(:thumb)}
        end
      end
    )
  end

  object :user_photo do
    field(:id, :id)
    field(:user_id, :id)
    field(:rank, :integer)

    field :image_url, :string do
      arg(:format, :string, default_value: "thumb")

      resolve(fn %Photo{image_url: image_url} = photo, %{format: format}, _ ->
        {:ok, UserPhotoUploader.url({image_url, photo}, String.to_atom(format))}
      end)
    end
  end

  object :location do
    field(:distance, :integer)
    field(:latitude, :float)
    field(:longitude, :float)
  end

  object :user_search_form do
    field(:genres, list_of(:genre))
    field(:occupation_types, list_of(:occupation_type))
  end

  object :user_form do
    field(:genres, list_of(:genre))
    field(:occupation_types, list_of(:occupation_type))
  end

  enum :user_status do
    value(:editing)
    value(:not_compeleted)
    value(:completed)
    value(:unactive)
  end

  input_object :user_search_conditions do
    field(:occupation_type_id, :id)
    field(:location, :location)
    field(:genre_id, :id)
    field(:is_active, :boolean)
    field(:skill_ids, list_of(:id))
  end

  input_object :user_input do
    field(:display_name, :string)
    field(:introduction, :string)
    field(:school_name, :string)
    field(:company_name, :string)
    field(:occupation, :string)
    field(:occupation_type_id, :id)
    field(:skill_ids, list_of(:id))
    field(:genre_id, :id)
    field(:zip_code, :string)
    field(:city_id, :id)
    field(:latitude, :float)
    field(:longitude, :float)
  end

  input_object :user_upload_input do
    field(:photo, :upload)
    field(:rank, :integer)
  end
end
