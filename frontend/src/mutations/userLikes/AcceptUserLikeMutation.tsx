import * as React from 'react';
import { Mutation } from 'react-apollo';
import { ACCEPT_USER_LIKE_MUTATION } from '../../graphql/userLikes';
import { MATCH_LIST_QUERY } from '../../graphql/matches';
import { MatchList } from '../../interfaces';

type Props = {
  children: any;
};

type MatchData = {
  matchList: MatchList;
};

const AcceptUserLikeMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={ACCEPT_USER_LIKE_MUTATION}
      context={{ needAuth: true }}
      refetchQueries={() => [{ query: MATCH_LIST_QUERY }]}
      // update={(cache, { data: { acceptUserLike: chat } }) => {
      //   const matchData: MatchData | null = cache.readQuery({ query: MATCH_LIST_QUERY });

      //   const matchList: MatchList = matchData!.matchList;
      //   cache.writeQuery({
      //     query: MATCH_LIST_QUERY,
      //     data: {
      //       ...matchList,
      //       chatList: [...matchList.chatList, chat]
      //     }
      //   });
      // }}
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
