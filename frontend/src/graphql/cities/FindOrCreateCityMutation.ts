import gql from 'graphql-tag';
import { CITY_FRAGMENTS } from './cityFragments';
import { parseFragment } from '../utilities/parseFragment';

export const FIND_OR_CREATE_CITY_MUTATION = gql`
  mutation FindOrCreateCity(
    $name: String!
    $stateName: String!
    $stateAbbreviation: String!
    $countryName: String!
  ) {
    findOrCreateCity(
      cityInput: {
        name: $name
        stateName: $stateName
        stateAbbreviation: $stateAbbreviation
        countryName: $countryName
      }
    ) {
      ${parseFragment(CITY_FRAGMENTS)}
    }
  }
`;
