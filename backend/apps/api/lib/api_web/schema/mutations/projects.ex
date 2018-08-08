defmodule ApiWeb.Schema.Mutations.Projects do
  use Absinthe.Schema.Notation
  alias ApiWeb.Schema.{Resolvers, Middleware}

  object :projects_mutations do
    @desc "Create project"
    field :create_project, :project do
      arg(:project_input, non_null(:project_input))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Projects.create/3)
    end

    @desc "Edit project"
    field :edit_project, :project do
      arg(:id, non_null(:integer))
      arg(:project_input, :project_input)
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Projects.edit/3)
    end

    @desc "Upload project photo"
    field :upload_project_photo, :project_photo do
      arg(:project_upload_input, :project_upload_input)
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Projects.upload_photo/3)
    end

    @desc "Delete project photo"
    field :delete_project_photo, :boolean do
      arg(:photo_id, non_null(:integer))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Projects.delete_photo/3)
    end

    @desc "Change project status"
    field :change_project_status, :boolean do
      arg(:project_id, non_null(:integer))
      arg(:status, non_null(:string))
      middleware(Middleware.Authorize)
      resolve(&Resolvers.Projects.change_status/3)
    end
  end
end
