import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { ACCEPT_USER_LIKE_MUTATION } from "../../graphql/user_likes";

type InputProps = {
    likeId: number
};

type Variables = {
    likeId: number
};

type Response = {
    id: number
};

const acceptUserLike = graphql<InputProps, Response, Variables, Response>(ACCEPT_USER_LIKE_MUTATION, {
    name: 'acceptUserLike',
    options: props => ({
        variables: {likeId: props.likeId}
    }),
    props: ({acceptUserLike}: NamedProps<{acceptUserLike: QueryProps & Response}, InputProps>): Response => {
        return {id: acceptUserLike.id};
    }
});

export default acceptUserLike;