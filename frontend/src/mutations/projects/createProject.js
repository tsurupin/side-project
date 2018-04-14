// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import CREATE_PROJECT from "../../graphql/projects/createProjectMutation.graphql";

type Response = {
  id: number,
  name: string,
  status: string
}

type InputProps = {
  name: string,
  leadSentence: ?string,
  motivation: ?string,
  requirement: ?string,
  genreId: ?number,
  skillIds: ?Array<number>
};

const createProject: OperationComponent<Response, InputProps> = graphql(CREATE_PROJECT,{
  name: 'createProject',
  options: props => ({
    variables: {
      name: props.name,
      leadSentence: props.leadSentence,
      motivation: props.motivation,
      requirement: props.requirement,
      genreId: props.genreId,
      skillIds: props,skillIds
     }
  })
});

export default createProject;
