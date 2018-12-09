import gql from 'graphql-tag';
import { PROJECT_FRAGMENTS } from './projectFragments';
import { parseFragment } from '../utilities/parseFragment';

export const CREATE_PROJECT_MUTATION = gql`
mutation CreateProject(
  $title: String!, $leadSentence: String, $motivation: String, $requirement: String, $genreId: ID, $skillIds: [ID]
) {
  createProject(
    projectInput: {
      title: $title,
      leadSentence: $leadSentence,
      motivation: $motivation,
      requirement: $requirement,
      genreId: $genreId,
      skillIds: $skillIds
    }
  ) {
    ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
  }
}`;
