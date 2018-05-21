export interface UserCore {
  id: number;
  displayName: string;
  mainPhotoUrl: string;
}

export interface UserDetails extends UserCore {
  areaName?: string;
  occupationTypeName?: string;
  genreName?: string;
  leadSentence?: string;
}

export interface Skill {
  id: number;
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

export interface Chat {
  id: number;
  name: string;
}

export interface Message {
  id: string,
  comment?: string,
  imageUrl?: string,
  user: UserCore
}

export interface MessageParams {
  chatId: string,
  comment?: string,
  image?: string
}