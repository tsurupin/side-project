import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { PROJECT_FRAGMENTS } from './projectFragments';

export const PROJECT_LIST_QUERY = gql`
query Projects($genreId: ID, $cityId: ID, $skillIds: [ID]) {
  projects(conditions: {genreId: $genreId, cityId: $cityId, skillIds: $skillIds}) {
    ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
  }
}`;
