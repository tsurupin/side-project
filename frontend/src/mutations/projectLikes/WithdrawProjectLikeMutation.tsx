import * as React from 'react';
import { Mutation } from 'react-apollo';
import { WITHDRAW_PROJECT_LIKE_MUTATION } from '../../graphql/projectLikes';

interface Props {
  children: any;
}

const WithdrawProjectLikeMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={WITHDRAW_PROJECT_LIKE_MUTATION}
      context={{ needAuth: true }}
    >
      {(withdrawProjectLikeMutation, { loading, error, data }) => {
        return children({ withdrawProjectLikeMutation, loading, error, data });
      }}
    </Mutation>
  );
};

export default WithdrawProjectLikeMutation;
