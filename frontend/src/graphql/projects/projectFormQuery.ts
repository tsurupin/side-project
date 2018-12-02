import gql from 'graphql-tag';

export const PROJECT_FORM_QUERY = gql`
query ProjectForm{
  projectForm {
    genres {
      id
      name
    }
  }
}`;
