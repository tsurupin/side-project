import { graphql, NamedProps, QueryProps, ChildDataProps } from 'react-apollo';
import * as CREATE_MESSAGE from "../../graphql/chats/createMessageMutation.graphql";

type User = {
  id: number,
  displayName: string,
  mainPhotoUrl: string
}

type Response = {
  chatId: number,
  comment: string | null,
  imageUrl: string | null,
  user: User
};

type InputProps = {
  chatId: number,
  comment: string | null,
  image: any | null
};
type Variables = {
  chatId: number,
  comment: string | null,
  image: any | null
};
type ChildProps = ChildDataProps<InputProps, Response, Variables>;

const createMessage = graphql<InputProps, Response, Variables, Response>(CREATE_MESSAGE,{
  name: 'createMessage',
  options: ({chatId, comment, image}) => ({
    variables: {
      chatId,
      comment,
      image
     }
  }),
  props: ({createMessage,}: NamedProps<{ createMessage: QueryProps & Response}, InputProps>): Response => {
    return {
      chatId: createMessage.chatId,
      comment: createMessage.comment,
      imageUrl: createMessage.imageUrl,
      user: createMessage.user
    };
  },
});

export default createMessage;
