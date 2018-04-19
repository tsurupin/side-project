import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { CHAT_QUERY, NEW_MESSAGE_SUBSCRIPTION } from '../../graphql/chats';

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

type Variables = {
  id: number
};

const fetchChat = graphql<InputProps, Response, Variables, Response>(CHAT_QUERY,{
  name: 'fetchChat',
  options: props => ({
    variables: { id: props.id }
  }),
  props: ({fetchChat}: NamedProps<{fetchChat: QueryProps & Response}, InputProps>): any => {
    return(
      subscribeToNewComments: params => {
          return fetchChat.subscribeToMore({
              document: NEW_MESSAGE_SUBSCRIPTION,
              variables: {
                  chatId: fetchChat.id,
              },
              updateQuery: (prev: any, {subscriptionData}) => {
                  console.log(prev);
                  console.log(subscriptionData);
                  if (!subscriptionData.data) {
                      return prev;
                  }
  
                  const newMessage = subscriptionData.data.newMessage;
  
                  return Object.assign({}, prev, {
                      messages: [newMessage, ...prev.fetchChat]
                  });
              }
          });
        }
      )
  }
});

export default fetchChat;
