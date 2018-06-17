import { NumberValue } from "apollo-utilities";

export interface City {
  id: string;
  fullName: string;
}

export interface CityEditParams {
  name: string;
  stateName: string;
  stateAbbreviation: string;
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
  introduction?: string;
  occupation?: string;
  occupationType?: OccupationType;
  skills: Skill[];
  companyName?: string;
  schoolName?: string;
  longitude?: number;
  latitude?: number;
  city?: City;
  photos?: UserPhoto[];
}

export interface Skill {
  id: string;
  name: string;
}
export interface Genre {
  id: string;
  name: string;
}

export interface OccupationType {
  id: string;
  name: string;
}

export interface UserSearchParams {
  occupationTypeId: string | undefined;
  genreId: string;
  isActive: boolean | undefined;
  distance: number | undefined;
  skillIds: string[];
}

export interface UserEditParams {
  displayName: string;
  introduction?: string;
  occupation?: string;
  occupationTypeId?: string;
  genreId?: string;
  skillIds?: string[];
  skills: Skill[];
  companyName?: string;
  schoolName?: string;
  zipCode?: string;
  longitude?: number;
  latitude?: number;
  city?: City;
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
  motivation: string | undefined;
  requirement: string | undefined;
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
  city?: City;
  skillIds?: number[];
}

export interface ProjectUploadParams {
  photo: string;
  rank: number;
}

export interface Chat {
  id: string;
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