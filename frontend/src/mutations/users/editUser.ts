import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { EDIT_USER_MUTATION } from "../../graphql/users";

type InputProps = {
    displayName: string,
    introduction?: string,
    occupation?: string,
    occupationTypeId?: number,
    genreId?: number,
    skillIds?: number[],
    companyName?: string,
    schoolName?: string,
    latitude?: number,
    longitude?: number,
};

type Variables = {
    displayName: string,
    introduction?: string,
    occupation?: string,
    occupationTypeId?: number,
    genreId?: number,
    skillIds?: number[],
    companyName?: string,
    schoolName?: string,
    latitude?: number,
    longitude?: number,
};

type Response = {};

const editUser = graphql<InputProps, Response, Variables, Response>(EDIT_USER_MUTATION, {
    name: 'editUser',
    options: props => ({
        variables: {
            displayName: props.displayName,
            introduction: props.introduction,
            occupation: props.occupation,
            occupationTypeId: props.occupationTypeId,
            genreId: props.genreId,
            skillIds: props.skillIds,
            companyName: props.companyName,
            schoolName: props.schoolName,
            latitude: props.latitude,
            longitude: props.longitude,
        }
    }),
    props: ({editUser}: NamedProps<{editUser: QueryProps & Response}, InputProps>): Response => {
        return {};
    }
});

export default editUser;