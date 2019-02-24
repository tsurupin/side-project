defmodule Db.Uploaders.ProjectPhotoUploader do
  use Arc.Definition
  use Arc.Ecto.Definition

  @versions [:original, :thumb]
  @acl :public_read
  def validate({file, _}) do
    ~w(.jpg .jpeg .gif .png) |> Enum.member?(Path.extname(file.file_name))
  end

  def transform(:thumb, _) do
    {:convert, "-strip -thumbnail x500^ -gravity center -extent x500"}
  end

  def filename(version, {_file, _scope}) do
    "#{version}"
  end

  # Override the storage directory:
  def storage_dir(_version, {file, scope}) do
    if Mix.env() == :test do
      "#{__DIR__}/../../../priv/uploads/project_photos"
    else
      "#{__DIR__}/../../../priv/uploads/project_photos/#{scope.uuid}"
    end
  end

  def default_url(:thumb) do
    "https://placehold.it/100x100"
  end

  def missing_url(:thumb) do
    "https://placehold.it/100x100"
  end
end
