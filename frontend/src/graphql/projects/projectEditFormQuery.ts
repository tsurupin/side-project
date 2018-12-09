import gql from 'graphql-tag';
import { PROJECT_FRAGMENTS } from './projectFragments';
import { parseFragment } from '../utilities/parseFragment';

export const PROJECT_EDIT_FORM_QUERY = gql`
query ProjectEditForm($id: ID!){
  projectForm {
    genres {
      id
      name
    }
  }
  project(id: $id) {
    ${parseFragment(PROJECT_FRAGMENTS.projectDetail)}
  }
}`;
