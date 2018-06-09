import * as React from "react";
import { Mutation } from "react-apollo";
import { LIKE_PROJECT_MUTATION } from "../../graphql/projectLikes";

type Props = {
  children: any;
};

const LikeProjectMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={LIKE_PROJECT_MUTATION} context={{ needAuth: true }}>
      {(likeProjectMutation, { loading, error, data }) => {
        return children({ likeProjectMutation, loading, error, data });
      }}
    </Mutation>
  );
};

export default LikeProjectMutation;
