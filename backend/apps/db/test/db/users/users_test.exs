defmodule Db.UsersTest do
  use Db.DataCase

  describe "changeset/1" do
    test "with invalid required attributes" do
      invalid_attrs = %{provider_id: "facebook"}
      %Changeset{valid?: valid_changeset?} = User.changeset(invalid_attrs)

      refute valid_changeset?
    end
  end

  describe "search/1" do
    setup do
      occupation_type1 = Factory.insert(:occupation_type)
      occupation_type2 = Factory.insert(:occupation_type)

      genre1 = Factory.insert(:genre)
      genre2 = Factory.insert(:genre)
      datetime = Timex.now()

      user1 =
        Factory.insert(
          :user,
          genre: genre1,
          occupation_type: occupation_type1,
          last_activated_at: Timex.shift(datetime, days: -5),
          geom: %Geo.Point{coordinates: {29, -90}, srid: 4326}
        )

      user2 =
        Factory.insert(
          :user,
          genre: genre2,
          occupation_type: occupation_type2,
          last_activated_at: Timex.shift(datetime, days: -3)
        )

      skill1 = Factory.insert(:skill)
      skill2 = Factory.insert(:skill)
      Factory.insert(:user_skill, user: user1, skill: skill1)
      Factory.insert(:user_skill, user: user2, skill: skill2)

      {
        :ok,
        user1: user1,
        user2: user2,
        genre_id: genre1.id,
        occupation_type_id: occupation_type2.id,
        skill1_id: skill1.id,
        skill2_id: skill2.id
      }
    end

    test "returns all records, when conditions is empty", %{user1: user1, user2: user2} do
      conditions = %{}
      {:ok, users} = Users.Users.search(conditions)

      assert Enum.map(users, & &1.id) == [user1.id, user2.id]
    end

    test "returns empty record, when only unexpected keyword is included", %{
      user1: user1,
      user2: user2
    } do
      conditions = %{test_id: 1}
      {:ok, users} = Users.Users.search(conditions)

      assert Enum.map(users, & &1.id) == [user1.id, user2.id]
    end

    test "returns users that are close to the current user", %{user1: user1} do
      conditions = %{
        location: %{distance: 10, latitude: 30, longitude: -90}
      }

      {:ok, users} = Users.Users.search(conditions)

      assert Enum.map(users, & &1.id) == [user1.id]
    end

    test "returns users that has that genre, when genre_id is included", %{
      user1: user1,
      genre_id: genre_id
    } do
      conditions = %{genre_id: genre_id}
      {:ok, users} = Users.Users.search(conditions)

      assert Enum.map(users, & &1.id) == [user1.id]
    end

    test "returns users that has occupation_type, when occupation_type_id is included", %{
      user2: user2,
      occupation_type_id: occupation_type_id
    } do
      conditions = %{occupation_type_id: occupation_type_id}
      {:ok, users} = Users.Users.search(conditions)

      assert Enum.map(users, & &1.id) == [user2.id]
    end

    test "returns users that was activated app within the last 3 days, when is_active is included",
         %{user2: user2} do
      conditions = %{is_active: true}
      {:ok, users} = Users.Users.search(conditions)

      assert Enum.map(users, & &1.id) == [user2.id]
    end

    test "returns users that have these skills, when skill_ids are included", %{
      user1: user1,
      skill1_id: skill1_id
    } do
      conditions = %{skill_ids: [skill1_id]}
      {:ok, users} = Users.Users.search(conditions)

      assert Enum.map(users, & &1.id) == [user1.id]
    end

    test "returns users matches to the multiple conditions, when multiple conditions are included",
         %{user2: user2, genre_id: genre_id, occupation_type_id: occupation_type_id} do
      conditions = %{genre_id: genre_id, is_active: true}
      {:ok, users} = Users.Users.search(conditions)

      assert Enum.map(users, & &1.id) == []

      conditions = %{occupation_type_id: occupation_type_id, is_active: true}
      {:ok, users} = Users.Users.search(conditions)

      assert Enum.map(users, & &1.id) == [user2.id]
    end
  end
end
