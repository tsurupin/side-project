// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";

import LOGIN_STATUS_QUERY from '../../graphql/accounts/loginStatusQuery.graphql';

type Response = {
  logined: boolean
}
const checkLoginStatus = graphql(LOGIN_STATUS_QUERY,
  {name: 'loginStatus'}
);

export default checkLoginStatus;
