defmodule Db.Uploaders.ChatImageUploader do
  use Arc.Definition
  use Arc.Ecto.Definition

  @versions [:original, :thumb, :mini_thumb]
  @acl :public_read
  def validate({file, _}) do
   ~w(.jpg .jpeg .gif .png) |> Enum.member?(Path.extname(file.file_name))
 end

 def transform(:thumb, _) do
   {:convert, "-strip -thumbnail x500^ -gravity center -extent x500"}
 end

 def transform(:mini_thumb, _) do
   {:convert, "-strip -thumbnail 200x200^ -gravity center -extent 200x200"}
 end

 def filename(version, {_file, _scope}) do
   "#{version}"
 end

 # Override the storage directory:
 def storage_dir(_version, {_file, scope}) do
   "uploads/chat_images/#{scope.uuid}"
 end
end
