defmodule Db.Uploaders.ChatImageUploader do
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
  def storage_dir(_version, {_file, scope}) do
    if Mix.env() == :test do
      "uploads/chat_images"
    else
      "uploads/chat_images/#{scope.id}"
    end
  end

end
