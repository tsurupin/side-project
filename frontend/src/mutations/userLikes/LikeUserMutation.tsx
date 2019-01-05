import * as React from 'react';
import { Mutation } from 'react-apollo';
import { LIKE_USER_MUTATION } from '../../graphql/userLikes';

type Props = {
  children: any;
};

const LikeUserMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={LIKE_USER_MUTATION} context={{ needAuth: true }}>
      {(likeUserMutation, a) => {
        console.log('error', a);

        const { loading, error, data } = a;
        return children({
          likeUserMutation,
          loading,
          error,
          data,
          name: 'likeUser'
        });
      }}
    </Mutation>
  );
};

export default LikeUserMutation;
