defmodule ApiWeb.Schema.Queries.FavoritesTest do
  use ApiWeb.ConnCase, async: false
  import Mock
  alias Db.Uploaders.UserPhotoUploader
  alias Db.Uploaders.ProjectPhotoUploader

  ## NOTE: not used yet
  # describe "favorites query" do
  #   setup do
  #     user = Factory.insert(:user)
  #     target_user = Factory.insert(:user)
  #     target_project = Factory.insert(:project)

  #     favorite1 = Factory.insert(:user_favorite, user: user, target_user_id: target_user.id)
  #     favorite2 = Factory.insert(:user_favorite, user: user, target_project_id: target_project.id)
  #     target_user_photo = Factory.insert(:user_photo, user: target_user, rank: 0)

  #     target_project_photo = Factory.insert(:project_photo, project: target_project, rank: 0)

  #     {
  #       :ok,
  #       user_id: user.id,
  #       favorite1_id: favorite1.id,
  #       favorite2_id: favorite2.id,
  #       target_user: target_user,
  #       target_project: target_project,
  #       target_user_photo_url:
  #         UserPhotoUploader.url({target_user_photo.image_url, target_user_photo}, :thumb),
  #       target_project_photo_url:
  #         ProjectPhotoUploader.url({target_project_photo.image_url, target_project_photo}, :thumb)
  #     }
  #   end

  #   @query """
  #     query {
  #       favoriteList {
  #         id
  #         type
  #         targetUser {
  #           id
  #           displayName
  #           mainPhotoUrl
  #         }
  #         targetProject {
  #           id
  #           name
  #           mainPhotoUrl
  #         }
  #       }
  #     }
  #   """

  #   test "favoriteList query returns favorite_list", ctx do
  #     %{
  #       user_id: user_id,
  #       favorite1_id: favorite1_id,
  #       favorite2_id: favorite2_id,
  #       target_user: target_user,
  #       target_project: target_project,
  #       target_user_photo_url: target_user_photo_url,
  #       target_project_photo_url: target_project_photo_url
  #     } = ctx

  #     with_mock Api.Accounts.Authentication,
  #       verify: fn user_id -> {:ok, Db.Repo.get(Db.Users.User, user_id)} end do
  #       conn =
  #         build_conn()
  #         |> put_req_header("authorization", "Bearer #{user_id}")
  #         |> get("/api", %{query: @query})

  #       response = json_response(conn, 200)

  #       expected_result = %{
  #         "favoriteList" => [
  #           %{
  #             "id" => "#{favorite1_id}",
  #             "type" => "user",
  #             "targetProject" => nil,
  #             "targetUser" => %{
  #               "displayName" => target_user.display_name,
  #               "id" => "#{target_user.id}",
  #               "mainPhotoUrl" => target_user_photo_url
  #             }
  #           },
  #           %{
  #             "id" => "#{favorite2_id}",
  #             "type" => "project",
  #             "targetProject" => %{
  #               "name" => target_project.name,
  #               "id" => "#{target_project.id}",
  #               "mainPhotoUrl" => target_project_photo_url
  #             },
  #             "targetUser" => nil
  #           }
  #         ]
  #       }

  #       assert response["data"] == expected_result
  #     end
  #   end
  # end
end
