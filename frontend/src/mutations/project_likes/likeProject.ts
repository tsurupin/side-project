import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { LIKE_PROJECT_MUTATION } from '../../graphql/project_likes';

type InputProps = {
    projectId: number
};

type Variables = {
    projectId: number
};

type Response = {
    id: number
};

const likeProject = graphql<InputProps, Response, Variables, Response>(LIKE_PROJECT_MUTATION, {
    name: 'likeProject',
    options: props => ({
        variables: {projectId: props.projectId}
    }),
    props: ({likeProject}: NamedProps<{likeProject: QueryProps & Response}, InputProps>): Response => {
        return {id: likeProject.id};
    }
});

export default likeProject;