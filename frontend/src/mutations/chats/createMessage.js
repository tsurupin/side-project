// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import CREATE_MESSAGE from "../../graphql/chats/createMessageMutation.graphql";

type User = {
  id: string,
  displayName: string,
  mainPhotoUrl: string
}

type Response = {
  chatId: integer,
  comment: ?string,
  imageUrl: ?string,
  user: User
}

type InputProps = {
  chatId: integer,
  comment: ?string,
  image: ?Upload
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
