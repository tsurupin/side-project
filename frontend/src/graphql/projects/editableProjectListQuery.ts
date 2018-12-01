import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { PROJECT_FRAGMENTS } from './projectFragments';

export const EDITABLE_PROJECT_LIST_QUERY = gql`
query EditableProjects {
  editableProjects {
    ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
  }
}`;
