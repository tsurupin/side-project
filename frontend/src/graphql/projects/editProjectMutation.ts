import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { PROJECT_FRAGMENTS } from './projectFragments';

export const EDIT_PROJECT_MUTATION = gql`
mutation EditProject($id: ID!, $title: String, $leadSentence: String, $motivation: String, $requirement: String, $cityId: ID, $genreId: ID, $skillIds: [ID]) {
  editProject(id: $id, projectInput: {title: $title, leadSentence: $leadSentence, motivation: $motivation, requirement: $requirement, cityId: $cityId, genreId: $genreId, skillIds: $skillIds}) {
    ${parseFragment(PROJECT_FRAGMENTS.projectDetails)}
  }
}`;
