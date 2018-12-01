import * as React from 'react';
import { Query } from 'react-apollo';
import { USER_EDIT_FORM_QUERY } from '../../graphql/users';
interface Props {
  children: any;
}

const UserEditFormQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={USER_EDIT_FORM_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, error, loading }) => {
        return children({
          data,
          loading,
          error,
        });
      }}
    </Query>
  );
};

export default UserEditFormQuery;
