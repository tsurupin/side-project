import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { LIKE_USER_MUTATION } from "../../graphql/user_likes";

type InputProps = {
    targetUserId: number
};

type Variables = {
    targetUserId: number
};

type Response = {};

const likeUser = graphql<InputProps, Response, Variables, Response>(LIKE_USER_MUTATION, {
    name: 'likeUser',
    options: props => ({
        variables: {targetUserId: props.targetUserId}
    }),
    props: ({likeUser}: NamedProps<{likeUser: QueryProps & Response}, InputProps>): Response => {
        return {};
    }
});

export default likeUser;