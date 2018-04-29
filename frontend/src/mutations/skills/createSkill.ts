import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { CREATE_SKILL_MUTATION } from "../../graphql/skills";

type InputProps = {
    name: string
};

type Variables = {
    name: string
};

type Response = {
    id: number,
    name: string
};

const createSkill = graphql<InputProps, Response, Variables, Response>(CREATE_SKILL_MUTATION, {
    name: 'createSkill',
    options: ({name}) => ({
        variables: {name: name},
        context: {needAuth: false},
    }),
    props: ({createSkill}: NamedProps<{createSkill: QueryProps & Response}, InputProps>): Response => {
        return {
            id: createSkill.id,
            name: createSkill.name
        };
    }
});

export default createSkill;