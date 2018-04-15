import { graphql, NamedProps, QueryProps } from 'react-apollo';
import CHAT_QUERY from '../../graphql/chats/chatQuery.graphql';

type Message = {
  id: number,
  comment: string | null,
  imageUrl: string | null
}

type User = {
  id: number,
  displayName: string,
  mainPhotoUrl: string
}

type Response = {
  id: number,
  name: string,
  messages: Message[]
}

type InputProps = {
  id: number
};

const fetchChat = graphql<Response, InputProps>(CHAT_QUERY,{
  name: 'fetchChat',
  options: props => ({
    variables: { id: props.id }
  }),
  props: ({fetchChat}: NamedProps<{fetchChat: QueryProps & Response}, InputProps>): Response => {
    return fetchChat;
  }
});

export default fetchChat;
