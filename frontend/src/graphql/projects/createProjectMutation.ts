import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { PROJECT_FRAGMENTS } from './projectFragments';

export const CREATE_PROJECT_MUTATION = gql`
mutation CreateProject($title: String!, $leadSentence: String, $motivation: String, $requirement: String, $genreId: ID, $skillIds: [ID]) {
  createProject(projectInput: {title: $title, leadSentence: $leadSentence, motivation: $motivation, requirement: $requirement, genreId: $genreId, skillIds: $skillIds}) {
    ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
  }
}`;
