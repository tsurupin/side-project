import * as React from "react";
import { Query } from "react-apollo";
import { MY_USER_QUERY } from "../../graphql/users";

type Props = {
  children: any;
};

const MyUserQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={MY_USER_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default MyUserQuery;
