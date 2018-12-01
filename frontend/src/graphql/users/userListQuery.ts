import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { USER_FRAGMENTS } from './userFragments';

export const USER_LIST_QUERY = gql`
query Users($occupationTypeId: ID, $genreId: ID, $distance: Int, $latitude: Float, $longitude: Float, $isActive: Boolean, $skillIds: [ID]) {
  users(conditions: {occupationTypeId: $occupationTypeId, genreId: $genreId, location: {distance: $distance, latitude: $latitude, longitude: $longitude}, isActive: $isActive, skillIds: $skillIds}) {
    ${parseFragment(USER_FRAGMENTS.userOnList)}
  }
}`;
