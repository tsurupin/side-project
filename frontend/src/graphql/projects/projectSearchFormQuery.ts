import graphqlTag from 'graphql-tag';

export const PROJECT_SEARCH_FORM_QUERY = gql`
query ProjectSearchForm{
  projectSearchForm {
    genres {
      id
      name
    }
  }
}`;
