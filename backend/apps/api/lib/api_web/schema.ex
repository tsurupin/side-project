defmodule ApiWeb.Schema do
  use Absinthe.Schema

  alias ApiWeb.Resolvers
  alias ApiWeb.Schema.Middleware

  import_types ApiWeb.Schema.Types.Commons
  import_types ApiWeb.Schema.Types.Countries
  import_types ApiWeb.Schema.Types.Genres
  import_types ApiWeb.Schema.Types.OccupationTypes
  import_types ApiWeb.Schema.Types.Skills
  import_types ApiWeb.Schema.Types.Users
  import_types ApiWeb.Schema.Types.Favorites
  import_types ApiWeb.Schema.Types.Projects
  import_types ApiWeb.Schema.Types.Chats
  import_types ApiWeb.Schema.Types.Matches
  import_types ApiWeb.Schema.Queries.Users
  import_types ApiWeb.Schema.Queries.Skills
  import_types ApiWeb.Schema.Queries.Projects
  import_types ApiWeb.Schema.Queries.Favorites
  import_types ApiWeb.Schema.Queries.Chats
  import_types ApiWeb.Schema.Queries.Matches

  query do
    import_fields :users_queries
    import_fields :skills_queries
    import_fields :projects_queries
    import_fields :favorites_queries
    import_fields :chats_queries
    import_fields :matches_queries
  end

  def middleware(middleware, field, object) do
    middleware
    # |> apply(:errors, field, object)
    # |> apply(:debug, field, object)
  end

  # #
  # defp apply(middleware, :errors, _field, %{identifier: :mutation}) do
  #   middleware ++ [Middleware.ChangesetErrors]
  # end
  # #
  defp apply(middleware, :debug, _field, _object) do
    if System.get_env("DEBUG") do
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

  # import_types(__MODULE__.AccountsTypes)
  # import_types(Absinthe.Phoenix.Types)
  # #
  #
  # #
  # # object :comment do
  # #   field :channel, :string
  # #   field :content, :string
  # # end
  #
  # object :comment do
  #   field(:id, :integer)
  #   field(:content, :string)
  #   field(:repo_name, :string)
  # end
  #
  # query do
  #   field :test, :test do
  #     # middleware Middleware.Authorize
  #     resolve(&Resolvers.Accounts.test/3)
  #   end
  #
  #   field :comments, list_of(:comment) do
  #     arg(:repo_name, non_null(:string))
  #     # middleware Middleware.Authorize
  #     resolve(fn a, b, c ->
  #       {:ok, [%{id: 1, content: 'comment1'}]}
  #     end)
  #   end
  #
  #   # field :refresh_token, :user do
  #   #   arg :refresh_token, non_null(:string)
  #   #   resolve &Resolvers.Accounts.refresh/3
  #   # end
  # end
  #
  # @desc "Signup"
  # mutation do
  #   field :signup, :user do
  #     arg(:provider_id, non_null(:string))
  #     arg(:uid, non_null(:string))
  #     # arg :email, :string
  #     # arg :display_name, :string
  #     # arg :photo_url, :string
  #     resolve(&Resolvers.Accounts.signup/3)
  #   end
  #
  #   field :submit_comment, :comment do
  #     arg(:repo_name, non_null(:string))
  #
  #     resolve(fn a, b, c ->
  #       IO.inspect("just submit-----------")
  #       {:ok, %{id: 1, content: 'comment2', repo_name: 'test'}}
  #     end)
  #   end
  #
  #   # field :submit_comment, :comment do
  #   #   arg :channel, non_null(:string)
  #   #   arg :content, non_null(:string)
  #   #   resolve &Resolver.Comments.submit_comment/3
  #   # end
  # end
  #
  # subscription do
  #   field :comment_added, :comment do
  #     arg(:repo_name, non_null(:string))
  #
  #     config(fn args, _ ->
  #       {:ok, topic: args.repo_name}
  #     end)
  #
  #     # this tells Absinthe to run any subscriptions with this field every time
  #     # the :submit_comment mutation happens.
  #     # It also has a topic function used to find what subscriptions care about
  #     # this particular comment
  #
  #     trigger(:submit_comment, topic: fn comment -> [comment.repo_name] end)
  #
  #     resolve(fn comment, _, _ ->
  #       IO.inspect(comment)
  #       IO.inspect('resolving')
  #
  #       # this function is often not actually necessary, as the default resolver
  #       # for subscription functions will just do what we're doing here.
  #       # The point is, subscription resolvers receive whatever value triggers
  #       # the subscription, in our case a comment.
  #       {:ok, %{id: 1, content: 'comment2'}}
  #     end)
  #   end

    #   field :comment_added, :comment do
    #     arg :channel, non_null(:string)
    #     arg :content, non_null(:string)
    #     # The topic function is used to determine what topic a given subscription
    #   # cares about based on its arguments. You can think of it as a way to tell the
    #   # difference between
    #   # subscription {
    #   #   commentAdded(repoName: "absinthe-graphql/absinthe") { content }
    #   # }
    #   #
    #   # and
    #   #
    #   # subscription {
    #   #   commentAdded(repoName: "elixir-lang/elixir") { content }
    #   # }
    #   config fn args, _ ->
    #     {:ok, topic: args.channel}
    #   end
    #
    #   # this tells Absinthe to run any subscriptions with this field every time
    #   # the :submit_comment mutation happens.
    #   # It also has a topic function used to find what subscriptions care about
    #   # this particular comment
    #
    #   trigger :submit_comment, topic: fn comment ->
    #     comment.channel
    #   end
    #
    #   resolve fn comment, _, _ ->
    #     # this function is often not actually necessary, as the default resolver
    #     # for subscription functions will just do what we're doing here.
    #     # The point is, subscription resolvers receive whatever value triggers
    #     # the subscription, in our case a comment.
    #     {:ok, comment}
    #   end
    #
    #
  #end
end
