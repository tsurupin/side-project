import * as React from 'react';
import { Query } from 'react-apollo';
import { USER_DETAIL_QUERY } from '../../graphql/users';

type Props = {
  variables: { id: number };
  children: any;
};

const UserDetailQuery = (props: Props) => {
  const { variables, children } = props;
  return (
    <Query query={USER_DETAIL_QUERY} variables={variables} context={{ needAuth: true }} notifyOnNetworkStatusChange>
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default UserDetailQuery;
