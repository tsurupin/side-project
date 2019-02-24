import gql from 'graphql-tag';
import { PROJECT_FRAGMENTS } from '../projects/projectFragments';
import { parseFragment } from '../utilities/parseFragment';

export const LIKE_PROJECT_MUTATION = gql`
  mutation LikeProject($projectId: ID!) {
    likeProject(projectId: $projectId) {
      ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
    }
  }
`;
