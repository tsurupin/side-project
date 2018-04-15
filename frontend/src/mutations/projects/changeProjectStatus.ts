import { graphql, NamedProps, QueryProps } from 'react-apollo';
import CHANGE_PROJECT_STATUS from '../../graphql/projects/changeProjectStatusMutation.graphql';


type InputProps = {
  projectId: number,
  status: string
};

type Response = {};

const changeProjectStatus = graphql<Response, InputProps>(CHANGE_PROJECT_STATUS, {
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
