defmodule ApiWeb.Schema.Types.Countries do
  use Absinthe.Schema.Notation

  object :country do
    field(:id, :id)
    field(:name, :string)
    field(
      :country_name,
      :string,
      resolve: fn _, %{source: user} ->
        case Users.main_photo(user) do
          %Photo{image_url: image_url} = photo ->
            {:ok, UserPhotoUploader.url({image_url, photo}, :thumb)}

          _ ->
            {:ok, UserPhotoUploader.missing_url(:thumb)}
        end
      end
    )
  end
end
