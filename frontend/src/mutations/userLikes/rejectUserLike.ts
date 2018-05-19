import { graphql, NamedProps, QueryProps } from "react-apollo";
import { REJECT_USER_LIKE_MUTATION } from "../../graphql/user_likes";

type InputProps = {
  likeId: number;
};

type Variables = {
  likeId: number;
};

type Response = {};

const rejectUserLike = graphql<InputProps, Response, Variables, Response>(
  REJECT_USER_LIKE_MUTATION,
  {
    name: "rejectUserLike",
    options: props => ({
      variables: { likeId: props.likeId }
    }),
    props: ({
      rejectUserLike
    }: NamedProps<
      { rejectUserLike: QueryProps & Response },
      InputProps
    >): Response => {
      return {};
    }
  }
);

export default rejectUserLike;
