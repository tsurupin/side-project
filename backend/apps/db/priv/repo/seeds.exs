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


Repo.insert!(
%Users.Photo{user_id: owner.id,
  is_main: true,
  image_url: %Plug.Upload{content_type: "image/jpeg", filename: "user1.jpg", path: "priv/repo/images/seeds/user1.jpg"}
})

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
