defmodule ApiWeb.Schema do
  use Absinthe.Schema

  alias ApiWeb.Resolvers
  alias ApiWeb.Schema.Middleware

  import_types(Absinthe.Plug.Types)

  import_types(ApiWeb.Schema.Types.Commons)
  import_types(ApiWeb.Schema.Types.Cities)
  import_types(ApiWeb.Schema.Types.Genres)
  import_types(ApiWeb.Schema.Types.OccupationTypes)
  import_types(ApiWeb.Schema.Types.Skills)
  import_types(ApiWeb.Schema.Types.Users)
  import_types(ApiWeb.Schema.Types.Favorites)
  import_types(ApiWeb.Schema.Types.Projects)
  import_types(ApiWeb.Schema.Types.Chats)
  import_types(ApiWeb.Schema.Types.Matches)

  import_types(ApiWeb.Schema.Queries.Users)
  import_types(ApiWeb.Schema.Queries.Skills)
  import_types(ApiWeb.Schema.Queries.Cities)
  import_types(ApiWeb.Schema.Queries.Projects)
  import_types(ApiWeb.Schema.Queries.Favorites)
  import_types(ApiWeb.Schema.Queries.Chats)
  import_types(ApiWeb.Schema.Queries.Matches)

  import_types(ApiWeb.Schema.Mutations.Users)
  import_types(ApiWeb.Schema.Mutations.Skills)
  import_types(ApiWeb.Schema.Mutations.Projects)
  import_types(ApiWeb.Schema.Mutations.UserLikes)
  import_types(ApiWeb.Schema.Mutations.ProjectLikes)
  import_types(ApiWeb.Schema.Mutations.Chats)

  import_types(ApiWeb.Schema.Subscriptions.Chats)

  query do
    import_fields(:users_queries)
    import_fields(:skills_queries)
    import_fields(:projects_queries)
    import_fields(:favorites_queries)
    import_fields(:chats_queries)
    import_fields(:cities_queries)
    import_fields(:matches_queries)
  end

  mutation do
    import_fields(:users_mutations)
    import_fields(:skills_mutations)
    import_fields(:projects_mutations)
    import_fields(:user_likes_mutations)
    import_fields(:project_likes_mutations)
    import_fields(:chats_mutations)
  end

  subscription do
    import_fields(:chats_subscriptions)
  end

  def middleware(middleware, field, object) do
    middleware
    |> apply(:debug, field, object)
  end

  # #
  # defp apply(middleware, :errors, _field, %{identifier: :mutation}) do
  #   middleware ++ [Middleware.ChangesetErrors]
  # end
  # #
  defp apply(middleware, :debug, _field, _object) do
    if System.get_env("DEBUG") && Mix.env() === "dev" do
      [{Middleware.Debug, :start}] ++ middleware
    else
      middleware
    end
  end

  #
  defp apply(middleware, _, _, _) do
    middleware
  end

  #
  # def plugins do
  #   #[Absinthe.Middleware.Dataloader | Absinthe.Plugin.defaults]
  #   [Absinthe.Plugin.defaults]
  # end

  # def dataloader() do
  #
  # end
  #
  # def context(ctx) do
  #   ctx
  #   |> Map.put(:loader, dataloader())
  # end
end
