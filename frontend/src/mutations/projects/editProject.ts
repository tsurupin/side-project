import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { EDIT_PROJECT_MUTATION } from "../../graphql/projects";

type Response = {
  id: number,
  name: string,
  status: string
}

type InputProps = {
  id: number,
  name: string,
  leadSentence: string,
  motivation: string | null,
  requirement: string | null,
  genreId: number | null,
  skillIds: number[]
};

type Variables = {
  id: number,
  name: string,
  leadSentence: string,
  motivation: string | null,
  requirement: string | null,
  genreId: number | null,
  skillIds: number[]
};

const editProject = graphql<InputProps, Response, Variables, Response>(EDIT_PROJECT_MUTATION,{
  name: 'editProject',
  options: props => ({
    variables: {
      id: props.id,
      name: props.name,
      leadSentence: props.leadSentence,
      motivation: props.motivation,
      requirement: props.requirement,
      genreId: props.genreId,
      skillIds: props.skillIds
     }
  }),
  props: ({editProject}: NamedProps<{editProject: QueryProps & Response}, InputProps>): Response => {
    return {
      id: editProject.id,
      name: editProject.name,
      status: editProject.status
    }
  }
});

export default editProject;
