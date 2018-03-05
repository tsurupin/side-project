// @flow
import { graphql } from "react-apollo";
//import type { OperationComponent } from "react-apollo";

import LOGOUT_MUTATION from '../../graphql/accounts/logoutMutation.graphql';

const logout = graphql(LOGOUT_MUTATION, {
  name: 'logout',
  options: { variables: { logined: false }}
})

export default logout;
