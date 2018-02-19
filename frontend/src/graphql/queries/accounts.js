import gql from 'graphql-tag';

export const getIdQuery = gql`
  {
    test {
      uid
    }
  }
`;

export const refreshTokenQuery = gql`
  query RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
    }
  }
`;
