// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import CREATE_MESSAGE from "../../graphql/chats/createMessageMutation.graphql";

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

const createProject: OperationComponent<Response, InputProps> = graphql(CREATE_MESSAGE,{
  name: 'createProject',
  options: props => ({
    variables: {
      name: props.name,
      
      chatId: props.chatId,
      comment: props.comment,
      image: props.image
     }
  })
});

export default createMessage;
