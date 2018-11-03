defmodule Db.Factory do
  @moduledoc """
  Factory functions to use in tests.
  """

  use ExMachina.Ecto, repo: Db.Repo

  alias Db.{
    Repo,
    Users,
    Projects,
    Skills,
    Locations,
    OccupationTypes.OccupationType,
    Genres,
    Chats
  }

  alias Locations.{Country, City, ZipCode}
  alias Genres.Genre
  alias Users.{User, UserLike, ProjectLike, Favorite}
  alias Skills.{Skill, UserSkill, ProjectSkill}

  @spec occupation_type_factory :: OccupationType.t()
  def occupation_type_factory do
    %OccupationType{
      name: sequence(:name, &"name:#{&1}")
    }
  end

  @spec country_factory :: Country.t()
  def country_factory() do
    %Country{
      name: sequence(:name, &"country:#{&1}")
    }
  end

  @spec city_factory :: City.t()
  def city_factory() do
    %City{
      name: sequence(:name, &"city:#{&1}"),
      state_name: sequence(:state_name, &"state:#{&1}"),
      country: build(:country)
    }
  end

  @spec zip_code_factory :: ZipCode.t()
  def zip_code_factory() do
    %ZipCode{
      zip_code: sequence(:zip_code, &"#{&1}")
    }
  end

  @spec genre_factory :: Genre.t()
  def genre_factory() do
    %Genre{
      name: sequence(:name, &"genre:#{&1}")
    }
  end

  @spec skill_factory :: Skill.t()
  def skill_factory() do
    %Skill{
      name: sequence(:name, &"skill:#{&1}")
    }
  end

  @doc """
  User factory.
  """
  @spec user_factory :: User.t()
  def user_factory do
    %User{
      uid: sequence(:uid, &"uid#{&1}"),
      provider_id: "facebook",
      display_name: "user",
      email: sequence(:email, &"user#{&1}@gmail.com"),
      occupation: "software engineer",
      company_name: "GoBay",
      school_name: "Stonford",
      status: 1,
      geom: %Geo.Point{coordinates: {37.773972, -122.431297}, srid: 4326},
      city: build(:city),
      occupation_type: build(:occupation_type),
      genre: build(:genre)
    }
  end

  @spec user_skill_factory :: UserSkill.t()
  def user_skill_factory() do
    %UserSkill{
      skill: build(:skill),
      user: build(:user),
      rank: sequence(:rank, & &1)
    }
  end

  @spec user_like_factory :: UserLike.t()
  def user_like_factory() do
    %UserLike{
      user: build(:user),
      target_user: build(:user)
    }
  end

  @spec project_like_factory :: ProjectLike.t()
  def project_like_factory() do
    %ProjectLike{
      user: build(:user),
      project: build(:project)
    }
  end

  @spec user_favorite_factory :: Favorite.t()
  def user_favorite_factory() do
    %Favorite{
      user: build(:user)
    }
  end

  @spec user_photo_factory :: Users.Photo.t()
  def user_photo_factory() do
    %Users.Photo{
      user: build(:user),
      rank: sequence(:rank, & &1),
      uuid: Ecto.UUID.generate(),
      image_url: %Plug.Upload{
        content_type: "image/jpeg",
        filename: "project1.jpg",
        path: Path.join(__DIR__, "../../priv/repo/images/seeds/project1.jpg")
      }
    }
  end

  @spec project_factory :: Projects.Project.t()
  def project_factory() do
    %Projects.Project{
      title: sequence(:name, &"engineer #{&1} matching platform"),
      lead_sentence: sequence(:lead_sentence, &"lead_sentence #{&1} matching platform"),
      motivation: "I has been struggling with finding engineers",
      requirement: "we need backend engineers",
      owner: build(:user),
      genre: build(:genre),
      city: build(:city)
    }
  end

  @spec project_photo_factory :: Projects.Photo.t()
  def project_photo_factory() do
    %Projects.Photo{
      project: build(:project),
      rank: sequence(:rank, & &1),
      uuid: Ecto.UUID.generate(),
      image_url: %Plug.Upload{
        content_type: "image/jpeg",
        filename: "project1.jpg",
        path: Path.join(__DIR__, "../../priv/repo/images/seeds/project1.jpg")
      }
    }
  end

  @spec project_member_factory :: Projects :: Member.t()
  def project_member_factory() do
    %Projects.Member{
      user: build(:user),
      project: build(:project)
    }
  end

  @spec project_skill_factory :: ProjectSkill.t()
  def project_skill_factory() do
    %ProjectSkill{
      skill: build(:skill),
      project: build(:project),
      rank: sequence(:rank, & &1)
    }
  end

  @spec project_member_factory :: Projects :: Member.t()
  def project_member_factory() do
    %Projects.Member{
      user: build(:user),
      project: build(:project)
    }
  end

  @spec chat_group_factory :: Chats :: Group.t()
  def chat_group_factory() do
    %Chats.Group{
      source_id: sequence(:source_id, & &1),
      source_type: "Project"
    }
  end

  @spec chat_factory :: Chats.Chat.t()
  def chat_factory() do
    %Chats.Chat{
      chat_group: build(:chat_group),
      name: sequence(:name, &"name:#{&1}")
    }
  end

  @spec chat_member_factory :: Chats.Member.t()
  def chat_member_factory() do
    %Chats.Member{
      chat: build(:chat),
      user: build(:user)
    }
  end

  @spec chat_comment_message_factory :: Chats.Message.t()
  def chat_comment_message_factory() do
    %Chats.Message{
      chat: build(:chat),
      user: build(:user),
      uuid: Ecto.UUID.generate(),
      comment: "comment"
    }
  end

  @spec chat_image_message_factory :: Chats.Message.t()
  def chat_image_message_factory() do
    %Chats.Message{
      chat: build(:chat),
      user: build(:user),
      uuid: Ecto.UUID.generate(),
      image_url: %Plug.Upload{
        content_type: "image/jpeg",
        filename: "project1.jpg",
        path: Path.join(__DIR__, "../../priv/repo/images/seeds/project1.jpg")
      }
    }
  end
end
