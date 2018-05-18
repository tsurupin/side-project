export interface UserDetails {
    id: number,
    displayName: string,
    areaName?: string,
    occupationTypeName?: string,
    genreName?: string,
    mainPhotoUrl: string,
    leadSentence?: string
};

export interface Skill  {
    id: number,
    name: string
};
export interface Genre {
    id: number,
    name: string
}

export interface OccupationType {
    id: number,
    name: string
}

export interface UserSearchParams {
    occupationTypeId?: number | null, 
    genreId?: number, 
    isActive?: boolean | null, 
    distance?: number | null,
    skillIds?: number[]
}
