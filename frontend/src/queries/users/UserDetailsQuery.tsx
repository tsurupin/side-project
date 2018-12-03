import * as React from 'react';
import { Query } from 'react-apollo';
import { USER_DETAILS_QUERY } from '../../graphql/users';

type Props = {
  variables: { id: number };
  children: any;
};

const UserDetailsQuery = (props: Props) => {
  const { variables, children } = props;
  return (
    <Query query={USER_DETAILS_QUERY} variables={variables} context={{ needAuth: true }} notifyOnNetworkStatusChange>
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default UserDetailsQuery;
