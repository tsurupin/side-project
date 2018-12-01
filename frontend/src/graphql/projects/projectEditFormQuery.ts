import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { PROJECT_FRAGMENTS } from './projectFragments';

export const PROJECT_EDIT_FORM_QUERY = gql`
query ProjectEditForm($id: ID!){
  projectForm {
    genres {
      id
      name
    }
  }
  project(id: $id) {
    ${parseFragment(PROJECT_FRAGMENTS.projectDetails)}
  }
}`;
