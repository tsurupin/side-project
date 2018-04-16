import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { CREATE_PROJECT_MUTATION } from "../../graphql/projects";

type Response = {
  id: number,
  name: string,
  status: string
};

type InputProps = {
  name: string,
  leadSentence: string | null,
  motivation: string | null,
  requirement: string | null,
  genreId: number | null,
  skillIds: number[]
};

type Variables = {
  name: string,
  leadSentence: string | null,
  motivation: string | null,
  requirement: string | null,
  genreId: number | null,
  skillIds: number[]
};


const createProject = graphql<InputProps, Response, Variables, Response>(CREATE_PROJECT_MUTATION,{
  name: 'createProject',
  options: props => ({
    variables: {
      name: props.name,
      leadSentence: props.leadSentence,
      motivation: props.motivation,
      requirement: props.requirement,
      genreId: props.genreId,
      skillIds: props.skillIds
     }
  }),
  props: ({createProject}: NamedProps<{createProject: QueryProps & Response}, InputProps>): Response => {
    return {
      id: createProject.id,
      name: createProject.name,
      status: createProject.status
    };
  }
});

export default createProject;
