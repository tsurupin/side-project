import * as React from 'react';
import { Query } from 'react-apollo';
import { USER_LIST_QUERY } from '../../graphql/users';
import { UserSearchSubmitParams } from '../../interfaces';

type Props = {
  variables: UserSearchSubmitParams;
  children: any;
};

const UserListQuery = (props: Props) => {
  const { variables, children } = props;

  return (
    <Query
      query={USER_LIST_QUERY}
      variables={variables}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ error, loading, data }) => {
        return children({ data, error, loading });
      }}
    </Query>
  );
};

export default UserListQuery;
