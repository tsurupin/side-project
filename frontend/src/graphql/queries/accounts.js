import gql from 'graphql-tag';

export const getIdQuery = gql`
  {
    test {
      uid
    }
  }
`;
