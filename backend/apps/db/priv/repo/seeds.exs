alias Db.Chats
alias Db.Countries.Country
alias Db.Genres.Genre
alias Db.OccupationTypes.OccupationType
alias Db.Skills
alias Db.Repo
alias Db.Users
alias Db.Projects
alias Db.Repo

Country |> Repo.delete_all
usa = Repo.insert!(
%Country{
  name: "United States"
}
)

OccupationType |> Repo.delete_all
software_engineer = Repo.insert!(
%OccupationType{
  name: "software engineer"
}
)

Genre |> Repo.delete_all
education = Repo.insert!(
%Genre{
  name: "education"
}
)

Users.User |> Repo.delete_all
Users.Photo |> Repo.delete_all
Users.Like |> Repo.delete_all
Users.Favorite |> Repo.delete_all

owner = Repo.insert!(
  %Users.User{
    uid: "uid1",
    provider_id: "facebook",
    display_name: "owner",
    email: "owner@gmail.com",
    occupation: "software engineer",
    company_name: "GoBay",
    school_name: "Stonford",
    status: 1,
    latitude: 37.772640,
    longitude: -122.409915,
    area_name: "San Francisco",
    occupation_type_id: software_engineer.id,
    country_id: usa.id,
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
    status: 1,
    latitude: 37.772640,
    longitude: -122.409915,
    area_name: "San Francisco",
    occupation_type_id: software_engineer.id,
    country_id: usa.id,
    genre_id: education.id
  }
)

Repo.insert!(
  %Users.Like{
    source_user_id: user.id,
    target_user_id: owner.id
  }
)

Repo.insert!(
  %Users.Favorite{
    user_id: user.id,
    target_id: owner.id,
    target_type: "User"
  }
)
user_photo_changeset = %{
  user_id: owner.id,
  is_main: true,
  image_url: %Plug.Upload{content_type: "image/jpeg", filename: "user1.jpg", path: Path.join(__DIR__, "images/seeds/user1.jpg")}
}

Users.Photo.changeset(user_photo_changeset) |> Repo.insert!



Projects.Project |> Repo.delete_all
Projects.Photo |> Repo.delete_all
Projects.Member |> Repo.delete_all


project = Repo.insert!(
  %Projects.Project{
    name: "engineer matching platform",
    lead_sentence: "this project is to connect engineers",
    motivation: "I has been struggling with finding engineers",
    requirement: "we need backend engineers",
    owner_id: owner.id,
    genre_id: education.id
  }
)

project_photo_changeset = %{
  project_id: project.id,
  is_main: true,
  image_url: %Plug.Upload{content_type: "image/jpeg", filename: "project1.jpg", path: Path.join(__DIR__, "images/seeds/project1.jpg")}
}


Projects.Photo.changeset(project_photo_changeset) |> Repo.insert!

Repo.insert!(
  %Projects.Member{
    user_id: user.id,
    project_id: project.id,
    status: 1
  }
)


Skills.ProjectSkill |> Repo.delete_all
Skills.UserSkill |> Repo.delete_all
Skills.Skill |> Repo.delete_all

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

Chats.Group |> Repo.delete_all
Chats.Chat |> Repo.delete_all
Chats.Content |> Repo.delete_all
Chats.Member |> Repo.delete_all

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
  %Chats.Content{
    chat_id: chat.id,
    source_id: user.id,
    source_type: "User",
    message: "Hello World!"
  }
)

chat_image_changeset = %{
  chat_id: chat.id,
  source_id: user.id,
  source_type: "User",
  image_url: %Plug.Upload{content_type: "image/jpeg", filename: "project1.jpg", path: Path.join(__DIR__, "images/seeds/project1.jpg")}
}

Chats.Content.changeset(chat_image_changeset) |> Repo.insert!
