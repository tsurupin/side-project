import gql from "graphql-tag";

export const USER_FORM_QUERY = gql`
query UserForm{
  userForm {
    genres {
      id
      name
    }
    occupationTypes {
      id
      name
    }
  }
}`;
