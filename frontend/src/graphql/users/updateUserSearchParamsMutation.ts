import gql from "graphql-tag";
// type Location = {
//   distance: Int!;
//   latitude: Float!;
//   longitude: Float!;
// }
// type Skill {
//   id: ID!;
//   name: String!
// }

export const UPDATE_USER_SEARCH_PARMS_MUTATION = gql`
  mutation UpdateUserSearchParams($genreId: ID, $occupationTypeId: ID, $isActive: Boolean, $location: Location, skills: [Skill]) {
    updateUserSearchParams(userSearchParams: {genreID: $genreId, occupationTypeId: $occupationTypeId, isActive: $isActive, location: $location, skills: $skills}) @client
  }
`;