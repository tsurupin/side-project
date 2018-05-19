import * as React from "react";
import { Query } from "react-apollo";
import { LOGIN_STATUS_QUERY } from "../../graphql/accounts";

const LoginStatusQuery = (props: { children: any }) => {
  const { children } = props;
  return (
    <Query query={LOGIN_STATUS_QUERY} fetchPolicy={"cache-only"}>
      {({ error, loading, data }) => {
        const logined = data.logined;
        return children({ loading, error, logined });
      }}
    </Query>
  );
};

export default LoginStatusQuery;
