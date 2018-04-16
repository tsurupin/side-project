import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { CHANGE_PROJECT_STATUS_MUTATION } from '../../graphql/projects';


type InputProps = {
  projectId: number,
  status: string
};

type Variables = {
  projectId: number,
  status: string
};
type Response = {};

const changeProjectStatus = graphql<InputProps, Response, Variables, Response>(CHANGE_PROJECT_STATUS_MUTATION, {
  name: "changeProjectStatus",
  options: props => ({
    variables: {
      projectId: props.projectId,
      status: props.status
    }
  }),
  props: ({changeProjectStatus}: NamedProps<{ changeProjectStatus: QueryProps & Response}, InputProps>): Response => {
    return {};
  }
});

export default changeProjectStatus;
