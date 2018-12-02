import gql from 'graphql-tag';
import { PROJECT_FRAGMENTS } from './projectFragments';
import { parseFragment } from '../utilities/parseFragment';

export const PROJECT_DETAILS_QUERY = gql`
query Project($id: ID!) {
  project(id: $id) {
    ${parseFragment(PROJECT_FRAGMENTS.projectDetails)}
  }
}`;
