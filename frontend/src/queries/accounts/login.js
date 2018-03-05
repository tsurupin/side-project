// @flow
import { graphql } from "react-apollo";
//import type { OperationComponent } from "react-apollo";

import LOGIN_MUTATION from '../../graphql/accounts/loginMutation.graphql';

const login = graphql(LOGIN_MUTATION, {
  name: 'login',
  options: { variables: { logined: true }}
})

export default login;
