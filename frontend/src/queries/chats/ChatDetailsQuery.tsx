import * as React from "react";
import { Query } from "react-apollo";
import { CHAT_QUERY, NEW_MESSAGE_SUBSCRIPTION } from "../../graphql/chats";

type Props = {
  children: any,
  variables: { id: string };
};
const ChatDetailsQuery = (props: any) => {
  const { children, variables } = props;
  
  return (

    <Query
      query={CHAT_QUERY}
      variables={variables}
      context={{needAuth: true}}
      fetchPolicy="network-only"
      notifyOnNetworkStatusChange
    >
    {({subscribeToMore, error, data, loading}) => {
      const subscribeComments = () => subscribeToMore({
        document: NEW_MESSAGE_SUBSCRIPTION,
        variables: { chatId: variables.id },
        updateQuery: (prev, { subscriptionData }) => {
          console.log("prev", prev)
          console.log("SubscriptioNData:", subscriptionData);
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.newMessage;
    
          return {...prev, chat: {messages: [newMessage]}};
    
        }
      })
     
      return children({
        error,
        data,
        loading,
        subscribeComments
      })}
    }
  </Query>
  )
  
};

export default ChatDetailsQuery;

