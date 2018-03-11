alias Db.Repo
alias Db.Accounts
alias Yummy.Accounts.User
alias Yummy.Recipes
alias Yummy.Recipes.Recipe

User |> Repo.delete_all
{:ok, user} = Accounts.create_user(%{name: "Jose", email: "jose@yummy.com", password: "password", password_confirmation: "password"})
