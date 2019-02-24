import * as React from 'react';
import { Mutation } from 'react-apollo';
import { LIKE_USER_MUTATION } from '../../graphql/userLikes';
import { USER_LIST_QUERY } from '../../graphql/users';
import { UserCore } from '../../interfaces';

type UserData = {
  users: UserCore[];
};

type Props = {
  children: any;
};

const LikeUserMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={LIKE_USER_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { likeUser } }) => {
        try {
          const userListData = cache.readQuery({
            query: USER_LIST_QUERY
          });

          const tmpUsers = (userListData as UserData).users;
          const users = tmpUsers.filter((u) => u.id !== likeUser);

          cache.writeQuery({
            query: USER_LIST_QUERY,
            data: { users }
          });
        } catch (e) {
          console.log('error', e);
        }
      }}
    >
      {(likeUserMutation, a) => {
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
