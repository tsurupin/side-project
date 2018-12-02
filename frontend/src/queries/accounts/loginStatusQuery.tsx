import * as React from 'react';
import { Query } from 'react-apollo';
import { LOGIN_STATUS_QUERY } from '../../graphql/accounts';
import TokenManager from '../../utilities/TokenManager';

const LoginStatusQuery = (props: {children: any }) => {
  const { children } = props;
  return (
    <Query query={LOGIN_STATUS_QUERY} fetchPolicy={'cache-only'}>
      {({ client, data }) => {
        if (data && !data.logned) {
          TokenManager.hasActiveToken().then(logined => {
            if (logined) {
              client.writeQuery({
                query: LOGIN_STATUS_QUERY,
                data: { logined },
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
