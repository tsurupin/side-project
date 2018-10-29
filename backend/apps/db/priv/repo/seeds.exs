alias Db.Chats
alias Db.Locations.{Country, City, ZipCode}
alias Db.Genres.Genre
alias Db.OccupationTypes.OccupationType
alias Db.Skills
alias Db.Repo
alias Db.Users
alias Db.Projects
alias Db.Repo


Users.User |> Repo.delete_all
Users.Photo |> Repo.delete_all
Users.UserLike |> Repo.delete_all
Users.ProjectLike |> Repo.delete_all

Projects.Project |> Repo.delete_all
Projects.Photo |> Repo.delete_all
Projects.Member |> Repo.delete_all

Skills.ProjectSkill |> Repo.delete_all
Skills.UserSkill |> Repo.delete_all
Skills.Skill |> Repo.delete_all


Chats.Group |> Repo.delete_all
Chats.Chat |> Repo.delete_all
Chats.Message |> Repo.delete_all
Chats.Member |> Repo.delete_all

ZipCode |> Repo.delete_all
City |> Repo.delete_all
Country |> Repo.delete_all

OccupationType |> Repo.delete_all
Genre |> Repo.delete_all


usa = Repo.insert!(
%Country{
  name: "United States"
}
)


san_francisco = Repo.insert!(
%City{
  name: "San Francisco",
  state_name: "CA",
  country_id: usa.id
}
)


san_francisco_zip = Repo.insert!(
%ZipCode{
  zip_code: "94103",
  city_id: san_francisco.id
}
)


software_engineer = Repo.insert!(
%OccupationType{
  name: "software engineer"
}
)


education = Repo.insert!(
%Genre{
  name: "education"
}
)



owner = Repo.insert!(
  %Users.User{
    uid: "10211077112591399",
    provider_id: "facebook",
    display_name: "owner",
    email: "owner@gmail.com",
    occupation: "software engineer",
    company_name: "GoBay",
    school_name: "Stonford",
    status: 0,
    geom: %Geo.Point{ coordinates: {37.773972, -122.431297}, srid: 4326 },
    city_id: san_francisco.id,
    occupation_type_id: software_engineer.id,
    genre_id: education.id
  }
)

user = Repo.insert!(
  %Users.User{
    uid: "uid2",
    provider_id: "facebook",
    display_name: "user",
    email: "user@gmail.com",
    occupation: "software engineer",
    company_name: "GoBay",
    school_name: "Stonford",
    status: 0,
    latitude: 37.772640,
    longitude: -122.409915,
    city_id: san_francisco.id,
    occupation_type_id: software_engineer.id,
    genre_id: education.id
  }
)

Repo.insert!(
  %Users.UserLike{
    user_id: user.id,
    target_user_id: owner.id
  }
)

# Repo.insert!(
#   %Users.Favorite{
#     user_id: user.id,
#     target_id: owner.id,
#     target_type: "User"
#   }
# )
user_photo_changeset = %{
  user_id: owner.id,
  rank: 0,
  image_url: %Plug.Upload{content_type: "image/jpeg", filename: "user1.jpg", path: Path.join(__DIR__, "images/seeds/user1.jpg")}
}

Users.Photo.changeset(user_photo_changeset) |> Repo.insert!

project = Repo.insert!(
  %Projects.Project{
    title: "engineer matching platform",
    lead_sentence: "this project is to connect engineers",
    motivation: "I has been struggling with finding engineers",
    requirement: "we need backend engineers",
    status: 1,
    owner_id: owner.id,
    genre_id: education.id,
    city_id: san_francisco.id
  }
)

Repo.insert!(
  %Users.ProjectLike{
    user_id: owner.id,
    project_id: project.id
  }
)

project_photo_changeset = %{
  project_id: project.id,
  rank: 0,
  image_url: %Plug.Upload{content_type: "image/jpeg", filename: "project1.jpg", path: Path.join(__DIR__, "images/seeds/project1.jpg")}
}


Projects.Photo.changeset(project_photo_changeset) |> Repo.insert!

Repo.insert!(
  %Projects.Member{
    user_id: user.id,
    project_id: project.id,
    status: 1,
    role: 2
  }
)

rails = Repo.insert!(
  %Skills.Skill{
    name: "RoR"
  }
)

python = Repo.insert!(
  %Skills.Skill{
    name: "Python"
  }
)
Repo.insert!(
  %Skills.UserSkill{
    user_id: owner.id,
    skill_id: rails.id,
    rank: 0
  }
)

Repo.insert!(
  %Skills.UserSkill{
    user_id: owner.id,
    skill_id: python.id,
    rank: 1
  }
)

Repo.insert!(
  %Skills.UserSkill{
    user_id: user.id,
    skill_id: python.id,
    rank: 0
  }
)

Repo.insert!(
  %Skills.ProjectSkill{
    project_id: project.id,
    skill_id: python.id,
    rank: 0
  }
)

Repo.insert!(
  %Skills.ProjectSkill{
    project_id: project.id,
    skill_id: rails.id,
    rank: 1
  }
)

chat_group = Repo.insert!(
  %Chats.Group{
    source_id: project.id,
    source_type: "Project"
  }
)


chat = Repo.insert!(
  %Chats.Chat{
    chat_group_id: chat_group.id,
    name: "Side Project",
    is_main: true
  }
)

Repo.insert!(
  %Chats.Member{
    chat_id: chat.id,
    user_id: owner.id
  }
)

Repo.insert!(
  %Chats.Member{
    chat_id: chat.id,
    user_id: user.id
  }
)

Repo.insert!(
  %Chats.Message{
    chat_id: chat.id,
    user_id: user.id,
    comment: "Hello World!",
    uuid: Ecto.UUID.generate
  }
)

chat_image_changeset = %{
  chat_id: chat.id,
  user_id: user.id,
  image_url: %Plug.Upload{content_type: "image/jpeg", filename: "project1.jpg", path: Path.join(__DIR__, "images/seeds/project1.jpg")}
}

Chats.Message.changeset(chat_image_changeset) |> Repo.insert!
