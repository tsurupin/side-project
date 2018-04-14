// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import CREATE_PROJECT from "../../graphql/projects/createProjectMutation.graphql";

type User = {
  id: number,
  displayName: string,
  mainPhotoUrl: string
}

type Response = {
  chatId: number,
  comment: ?string,
  imageUrl: ?string,
  user: User
}

type InputProps = {
  chatId: number,
  comment: ?string,
  image: ?any
};

const createMessage: OperationComponent<Response, InputProps> = graphql(CREATE_MESSAGE,{
  name: 'createMessage',
  options: props => ({
    variables: {
      chatId: props.chatId,
      comment: props.comment,
      image: props.image
     }
  })
});

export default createMessage;
