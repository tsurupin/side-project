import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { CREATE_SKILL_MUTATION } from "../../graphql/skills";

type InputProps = {
    name: string
};

type Variables = {
    name: string
};

type Response = {
    id: number
};

const createSkill = graphql<InputProps, Response, Variables, Response>(CREATE_SKILL_MUTATION, {
    name: 'createSkill',
    options: props => ({
        variables: {name: props.name}
    }),
    props: ({createSkill}: NamedProps<{createSkill: QueryProps & Response}, InputProps>): Response => {
        return {id: createSkill.id};
    }
});

export default createSkill;