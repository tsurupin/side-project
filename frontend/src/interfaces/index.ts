import { NumberValue } from "apollo-utilities";

export interface City {
  id: string;
  fullName: string;
}
export interface CityDetails {
  id: string;
  fullName: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface UserCore {
  id: string;
  displayName: string;
  mainPhotoUrl: string;
  leadSentence?: string;
  genre?: Genre;
  city?: City;
}

export interface UserPhoto {
  id: string;
  imageUrl: string;
  rank: number;
  userId?: string;
}

export interface UserDetails extends UserCore {
  cityName?: string;
  introduction?: string;
  occupationType?: OccupationType;
  skills?: Skill[];
  companyName?: string;
  schoolName?: string;
  lontitude?: number;
  latitude?: number;
  cityId?: string;
  photos?: UserPhoto[];
}

export interface Skill {
  id: string;
  name: string;
}
export interface Genre {
  id: number;
  name: string;
}

export interface OccupationType {
  id: number;
  name: string;
}

export interface UserSearchParams {
  occupationTypeId?: number | null;
  genreId?: number;
  isActive?: boolean | null;
  distance?: number | null;
  skillIds?: number[];
}

export interface UserEditParams {
  displayName: string;
  introduction?: string;
  occupation?: string;
  occupationTypeId?: number;
  genreId?: number;
  skillIds?: number[];
  skills?: Skill[];
  companyName?: string;
  schoolName?: string;
  zipCode?: string;
  longitude?: number;
  latitude?: number;
  cityId?: number;
  cityName?: string;

}

export interface UserUploadParams {
  photo: string;
  rank: number;
}

export interface ProjectCore {
  id: string;
  title: string,
  leadSentence?: string,
  genre?: Genre,
  mainPhotoUrl: string;
  city?: City
}

export interface ProjectPhoto {
  id: string;
  imageUrl: string;
  rank: number;
  projectId?: string;
}

export interface ProjectDetails extends ProjectCore {
  leadSentence: string;
  status: string;
  motivation: string | null;
  requirement: string | null;
  owner: UserCore;
  genre: Genre;
  skills: Skill[];
  photos: ProjectPhoto[];
}

export interface ProjectSearchParams {
  genreId?: string;
  cityId?: string;
  skillIds?: string[];
}

export interface ProjectEditParams {
  title?: string;
  leadSentence?: string;
  motivation?: string;
  requirement?: string;
  genreId?: number;
  cityId?: number;
  zipCode?: string;
  skillIds?: number[];
}

export interface ProjectUploadParams {
  photo: string;
  rank: number;
}

export interface Chat {
  id: number;
  name: string;
}

export interface Message {
  id: string;
  comment?: string;
  imageUrl?: string;
  user: UserCore;
}

export interface MessageParams {
  chatId: string;
  comment?: string;
  image?: string;
}