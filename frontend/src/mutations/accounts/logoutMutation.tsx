import * as React from 'react';
import { Mutation } from 'react-apollo';
import { LOGOUT_MUTATION } from '../../graphql/accounts';

type Props = {
  children: any;
};

const LogoutMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={LOGOUT_MUTATION}>
      {(logoutMutation, { data, error, loading }) => {
        if (loading) {
          return children({ loading });
        }
        if (error) {
          return children({ error });
        }
        return children({ logoutMutation });
      }}
    </Mutation>
  );
};

export default LogoutMutation;
