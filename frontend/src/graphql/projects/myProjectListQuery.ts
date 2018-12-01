import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { PROJECT_FRAGMENTS } from './projectFragments';

export const MY_PROJECT_LIST_QUERY = gql`
query MyProjects {
  myProjects {
    ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
  }
}`;
