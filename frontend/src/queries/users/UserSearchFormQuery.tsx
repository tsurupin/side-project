import * as React from 'react';
import { Query } from 'react-apollo';
import { USER_SEARCH_FORM_QUERY } from '../../graphql/users';
import { USER_SEARCH_PARAMS_QUERY } from '../../graphql/users';

interface Props {
  children: any;
}

const UserSearchFormQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={USER_SEARCH_FORM_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, error, loading }) => {
        const formData = data;
        return (
          <Query query={USER_SEARCH_PARAMS_QUERY}>
            {({ data }) => {
              console.log('search params', { ...data, ...formData });
              return children({
                data: { ...data, ...formData },
                loading,
                error,
              });
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default UserSearchFormQuery;
