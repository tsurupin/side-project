import gql from 'graphql-tag';
import { CITY_FRAGMENTS } from './cityFragments';
import { parseFragment } from '../utilities/parseFragment';

export const CITY_LIST_QUERY = gql`
query CityList($name: String) {
  cityList(name: $name) {
    ${parseFragment(CITY_FRAGMENTS)}
  }
}`;
