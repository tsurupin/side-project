import gql from 'graphql-tag';
import { PROJECT_FRAGMENTS } from './projectFragments';
import { parseFragment } from '../utilities/parseFragment';

export const MY_PROJECT_LIST_QUERY = gql`
query MyProjects {
  myProjects {
    ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
  }
}`;
