import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { PROJECT_FRAGMENTS } from './projectFragments';

export const PROJECT_DETAILS_QUERY = gql`
query Project($id: ID!) {
  project(id: $id) {
    ${parseFragment(PROJECT_FRAGMENTS.projectDetails)}
  }
}`;
