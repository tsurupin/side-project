// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import CHANGE_PROJECT_STATUS from "../../graphql/projects/changeProjectStatusMutation.graphql";


type InputProps = {
  projectId: number,
  status: string
}

const changeProjectStatus: OperationComponent<null, InputProps> = graphql(CHANGE_PROJECT_STATUS, {
  name: "changeProjectStatus",
  options: props => ({
    variables: {
      projectId: props.projectId,
      status: props.status
    }
  })
});

export default changeProjectStatus;
