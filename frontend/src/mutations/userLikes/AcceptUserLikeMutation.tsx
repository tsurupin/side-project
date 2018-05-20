import * as React from "react";
import { Mutation } from "react-apollo";
import { ACCEPT_USER_LIKE_MUTATION } from "../../graphql/userLikes";

type Props = {
  children: any;
};

const AcceptUserLikeMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={ACCEPT_USER_LIKE_MUTATION} context={{ needAuth: true }}>
      {(acceptUserLikeMutation, { loading, error, data }) => {
        return children({ acceptUserLikeMutation, loading, error, data, name: "acceptUserLike" });
      }}
    </Mutation>
  );
};

export default AcceptUserLikeMutation;
