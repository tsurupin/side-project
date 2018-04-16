import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { CREATE_MESSAGE_MUTATION } from "../../graphql/chats";

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

const createMessage = graphql<InputProps, Response, Variables, Response>(CREATE_MESSAGE_MUTATION,{
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
