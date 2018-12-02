import gql from 'graphql-tag';

export const CITY_FRAGMENTS = gql`
  fragment CityDetails on City {
    id
    fullName
  }
`;
