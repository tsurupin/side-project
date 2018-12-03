import * as React from 'react';
import { Mutation } from 'react-apollo';
import { ACCEPT_USER_LIKE_MUTATION } from '../../graphql/userLikes';
import { MATCH_LIST_QUERY } from '../../graphql/matches';

type Props = {
  children: any;
};

const AcceptUserLikeMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={ACCEPT_USER_LIKE_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { acceptUserLike: chat } }) => {
        const { matchList } = cache.readQuery({ query: MATCH_LIST_QUERY });

        cache.writeQuery({
          query: MATCH_LIST_QUERY,
          data: {
            matchList: { ...matchList, chatList: [...matchList.chatList, chat] }
          }
        });
      }}
    >
      {(acceptUserLikeMutation, { loading, error, data }) => {
        return children({
          acceptUserLikeMutation,
          loading,
          error,
          data,
          name: 'acceptUserLike'
        });
      }}
    </Mutation>
  );
};

export default AcceptUserLikeMutation;
