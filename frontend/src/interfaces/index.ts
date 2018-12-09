export interface City {
  id: string;
  fullName: string;
}

export interface CityEditParams {
  name: string;
  stateName: string;
  stateAbbreviation: string;
  countryName: string;
}

export interface UserCore {
  id: string;
  displayName: string;
  mainPhotoUrl: string;
  introduction?: string;
  companyName?: string;
  occupation?: string;
  occupationType?: OccupationType;
  city?: City;
}

export interface UserPhoto {
  id: string;
  imageUrl: string;
  rank: number;
  userId?: string;
}

export interface UserDetails extends UserCore {
  introduction: string | undefined;
  occupation: string | undefined;
  genre: Genre | undefined;
  occupationType: OccupationType | undefined;
  skills: Skill[];
  companyName: string | undefined;
  schoolName: string | undefined;
  city: City | undefined;
  photos: UserPhoto[];
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

export interface Location {
  distance: number;
  latitude: number;
  longitude: number;
}

export interface UserSearchParams {
  occupationTypeId: string | undefined;
  genreId: string | undefined;
  isActive: boolean | undefined;
  location: Location | undefined;
  skills: Skill[];
}

export interface UserSearchSubmitParams {
  occupationTypeId?: string;
  genreId?: string;
  isActive?: boolean;
  location?: Location;
  skills?: Skill[];
}

export interface UserEditParams {
  displayName?: string;
  introduction?: string;
  occupation?: string;
  occupationTypeId?: string;
  genreId?: string;
  skillIds?: string[];
  companyName?: string;
  schoolName?: string;
  longitude?: number;
  latitude?: number;
  cityId?: string;
}

export interface ProjectCore {
  id: string;
  title: string;
  leadSentence?: string;
  genre?: Genre;
  mainPhotoUrl: string;
  city?: City;
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
  users: UserCore[];
  genre: Genre;
  skills: Skill[];
  photos: ProjectPhoto[];
}

export interface ProjectSearchParams {
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
}

export interface ProjectSearchSubmitParams {
  genreId?: string;
  cityId?: string;
  skillIds?: string[];
}

export interface ProjectCreateParams {
  title?: string;
  leadSentence?: string;
  motivation?: string;
  requirement?: string;
  genreId?: string;
  cityId?: string;
  skillIds?: string[];
}

export interface ProjectEditParams extends ProjectCreateParams {
  id: string;
}

export interface LikeProjectParams {
  projectId: string;
}

export interface UploadPhotoParams {
  photo: string;
  rank: number;
}

export interface DeletePhotoParams {
  photoId: string;
}

export interface ProjectUploadParams extends UploadPhotoParams {
  projectId: string;
}

export interface Chat {
  id: string;
  name: string;
  lastComment?: string | undefined;
  lastCommentedAt?: string | undefined;
  imageUrl?: string;
  messages: Message[];
}

export interface Message {
  id: string;
  comment?: string;
  imageUrl?: string;
  insertedAt: string;
  user: UserCore;
}

export interface MatchList {
  likedUserList: UserCore[];
  chatList: Chat[];
}

export interface MessageParams {
  chatId: string;
  comment?: string;
  image?: string;
  messageType: string;
}

export interface GraphQLError {
  locations: any[];
  message: string;
  path: string[];
}

export interface GraphQLErrorMessage {
  graphQLErrors: GraphQLError[];
  message: string;
  networkError: string | undefined;
  extraInfo: string | undefined;
}

export interface SignUpParams {
  providerId: string;
  uid: string;
}

export interface LoginParams {
  logined: boolean;
}

export interface MinimumOutput {
  loading: boolean;
  error: GraphQLErrorMessage | undefined;
}
