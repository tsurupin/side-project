import * as React from "react";
import { Mutation } from "react-apollo";
import { REJECT_USER_LIKE_MUTATION } from "../../graphql/user_likes";

type Props = {
  children: any;
};

const RejectUserLikeMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={REJECT_USER_LIKE_MUTATION} context={{ needAuth: true }}>
      {(rejectUserLikeMutation, { loading, error, data }) => {
        return children({ rejectUserLikeMutation, loading, error, data });
      }}
    </Mutation>
  );
};

export default RejectUserLikeMutation;
