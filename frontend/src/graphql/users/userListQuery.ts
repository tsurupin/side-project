import gql from "graphql-tag";
import { USER_FRAGMENTS } from './userFragments';

export const USER_LIST_QUERY = gql`
query Users($occupationTypeId: Int, $genreId: Int, $distance: Int, $isActive: Boolean, $skillIds: [Int]) {
  users(conditions: {occupationTypeId: $occupationTypeId, genreId: $genreId, distance: $distance, isActive: $isActive, skillIds: $skillIds}) {
    ${USER_FRAGMENTS.userOnList}
  }
}`;
