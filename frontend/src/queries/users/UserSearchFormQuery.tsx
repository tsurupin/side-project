import * as React from "react";
import { Query } from "react-apollo";
import { USER_SEARCH_FORM_QUERY } from "../../graphql/users";

type Props = {
  children: any;
};

const UserSearchFormQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={USER_SEARCH_FORM_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default UserSearchFormQuery;
