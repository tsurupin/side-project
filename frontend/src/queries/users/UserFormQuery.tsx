import * as React from "react";
import { Query } from "react-apollo";
import { USER_FORM_QUERY } from "../../graphql/users";
type Props = {
  children: any;
};

const UserFormQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={USER_FORM_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, error, loading }) => {
        return children({
          data,
          loading,
          error
        });
      }}
    </Query>
  );
};

export default UserFormQuery;
