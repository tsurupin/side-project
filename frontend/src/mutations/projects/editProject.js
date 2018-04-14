// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import EDIT_PROJECT from "../../graphql/projects/editProjectMutation.graphql";

type Response = {
  id: number,
  name: string,
  status: string
}

type InputProps = {
  id: number,
  name: string,
  leadSentence: ?string,
  motivation: ?string,
  requirement: ?string,
  genreId: ?number,
  skillIds: ?Array<number>
};

const editProject: OperationComponent<Response, InputProps> = graphql(EDIT_PROJECT,{
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
  })
});

export default editProject;
