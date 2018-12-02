import gql from 'graphql-tag';

export const USER_SEARCH_FORM_QUERY = gql`
query UserSearchForm{
  userSearchForm {
    occupationTypes {
      id
      name
    }
    genres {
      id
      name
    }
  }
}`;

// Figure out how to cache search params
