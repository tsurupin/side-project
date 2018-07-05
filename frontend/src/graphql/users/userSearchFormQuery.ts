import gql from "graphql-tag";

export const USER_SEARCH_FORM_QUERY = gql`
query UserSearchForm{
  userSearchForm {
    userSearchParams @client
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