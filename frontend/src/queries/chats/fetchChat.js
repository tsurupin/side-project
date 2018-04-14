// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";

import CHAT_QUERY from '../../graphql/chats/chatQuery.graphql';

type Message = {
  id: string,
  comment: ?string,
  imageUrl: ?string
}

type User = {
  id: string,
  displayName: string,
  mainPhotoUrl: string
}

type Response = {
  id: string,
  name: string,
  messages: ?Array<Message>
}

type InputProps = {
  id: string
};

const fetchChat: OperationComponent<Response, InputProps> = graphql(CHAT_QUERY,{
  name: 'fetchChat',
  options: props => ({
    variables: { id: props.id }
  })
});

export default fetchChat;
