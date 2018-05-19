import { graphql, NamedProps, QueryProps } from "react-apollo";
import { WITHDRAW_USER_LIKE_MUTATION } from "../../graphql/user_likes";

type InputProps = {
  targetUserId: number;
};

type Variables = {
  targetUserId: number;
};

type Response = {};

const withdrawUserLike = graphql<InputProps, Response, Variables, Response>(
  WITHDRAW_USER_LIKE_MUTATION,
  {
    name: "withdrawUserLike",
    options: props => ({
      variables: { targetUserId: props.targetUserId }
    }),
    props: ({
      withdrawUserLike
    }: NamedProps<
      { withdrawUserLike: QueryProps & Response },
      InputProps
    >): Response => {
      return {};
    }
  }
);
export default withdrawUserLike;
