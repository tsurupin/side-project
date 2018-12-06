import * as React from 'react';
import { Mutation } from 'react-apollo';
import { REJECT_USER_LIKE_MUTATION } from '../../graphql/userLikes';
import { MATCH_LIST_QUERY } from '../../graphql/matches';
import { UserCore, MatchList } from '../../interfaces';

type Props = {
  children: any;
};

type MatchData = {
  matchList: MatchList;
};

const RejectUserLikeMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={REJECT_USER_LIKE_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { rejectUserLike: userId } }) => {
        const matchData: MatchData | null = cache.readQuery({ query: MATCH_LIST_QUERY });
        const matchList = matchData!.matchList;
        const likedUserList = matchList.likedUserList.filter((user: UserCore) => user.id !== userId);

        cache.writeQuery({
          query: MATCH_LIST_QUERY,
          data: { matchList: { ...matchList, likedUserList } }
        });
      }}
    >
      {(rejectUserLikeMutation, { loading, error, data }) => {
        return children({
          rejectUserLikeMutation,
          loading,
          error,
          data,
          name: 'rejectUserLike'
        });
      }}
    </Mutation>
  );
};

export default RejectUserLikeMutation;
