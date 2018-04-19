import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { DELETE_USER_PHOTO__MUTATION } from "../../graphql/users";

type InputProps = {
    photoId: number
};

type Variables = {
    photoId: number
};

type Response = {};

const deleteUserPhoto = graphql<InputProps, Response, Variables, Response>(DELETE_USER_PHOTO__MUTATION, {
    name: 'deleteUserPhoto',
    options: ({photoId}) => ({
        variables: {photoId}
    }),
    props: ({deleteUserPhoto}: NamedProps<{deleteUserPhoto: QueryProps & Response}, InputProps>): Response => {
        return {};
    }
});

export default deleteUserPhoto;