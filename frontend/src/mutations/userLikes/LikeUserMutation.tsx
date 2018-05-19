import * as React from "react";
import { Mutation } from "react-apollo";
import { LIKE_USER_MUTATION } from "../../graphql/user_likes";

type Props = {
  children: any;
};

const LikeUserMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={LIKE_USER_MUTATION} context={{ needAuth: true }}>
      {(likeUserMutation, { loading, error, data }) => {
        return children({ likeUserMutation, loading, error, data });
      }}
    </Mutation>
  );
};

export default LikeUserMutation;
