import gql from 'graphql-tag';
import { USER_FRAGMENTS } from './userFragments';
import { parseFragment } from '../utilities/parseFragment';

export const USER_LIST_QUERY = gql`
query Users(
  $occupationTypeId: ID,
  $genreId: ID, $distance: Int,
  $latitude: Float,
  $longitude: Float,
  $isActive: Boolean,
  $skillIds: [ID]) {
    users(
      conditions: {
        occupationTypeId: $occupationTypeId,
        genreId: $genreId,
        location: {
          distance: $distance,
          latitude: $latitude,
          longitude: $longitude
        },
        isActive: $isActive,
        skillIds: $skillIds
      }
    ) {
    ${parseFragment(USER_FRAGMENTS.userOnList)}
  }
}`;
