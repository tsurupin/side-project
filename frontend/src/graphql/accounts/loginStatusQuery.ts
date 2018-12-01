import graphqlTag from 'graphql-tag';

export const LOGIN_STATUS_QUERY = gql`
  {
    logined @client
  }
`;
