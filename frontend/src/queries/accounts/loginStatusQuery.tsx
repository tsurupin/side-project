import * as React from "react";
import { Query } from "react-apollo";
import { LOGIN_STATUS_QUERY } from "../../graphql/accounts";
import { hasActiveToken } from "../../utilities/firebase";
const LoginStatusQuery = (props: { children: any }) => {
  const { children } = props;
  return (
    <Query query={LOGIN_STATUS_QUERY} fetchPolicy={"cache-only"}>
      {({ client, data, refetch }) => {
        console.log("data is...", data);
        if (data) {
          hasActiveToken().then(logined => {
            if (logined) {
              client.writeQuery({
                query: LOGIN_STATUS_QUERY,
                data: { logined }
              });
            }
          });
        }

        return children({ data });
      }}
    </Query>
  );
};

export default LoginStatusQuery;
