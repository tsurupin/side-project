import gql from "graphql-tag";

export const PROJECT_SEARCH_FORM_QUERY = gql`
query ProjectSearchForm{
  projectSearchForm {
    projectSearchParams @client
    genres {
      id
      name
    }
  }
}`;