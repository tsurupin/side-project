import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { CITY_FRAGMENTS } from './cityFragments';

export const CITY_LIST_QUERY = gql`
query CityList($name: String) {
  cityList(name: $name) {
    ${parseFragment(CITY_FRAGMENTS)}
  }
}`;
