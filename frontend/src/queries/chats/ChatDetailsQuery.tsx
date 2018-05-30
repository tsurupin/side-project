import * as React from "react";
import { Query } from "react-apollo";
import { CHAT_QUERY, NEW_MESSAGE_SUBSCRIPTION } from "../../graphql/chats";
import { COMMENT_ADDED_SUBSCRIPTION } from "../../graphql/comments";

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
      notifyOnNetworkStatusChange
    >
    {({ subscribeToMore, error, data, loading}) => {
       const subscribeMessages = () => {
         console.log("subscribeMessages fired!", variables)
         
         return subscribeToMore({
          document: NEW_MESSAGE_SUBSCRIPTION,
          variables: { chatId: variables.id },
          updateQuery: (prev, { subscriptionData }) => {
            console.log("prev", prev)
            console.log("SubscriptioNData:", subscriptionData);
            if (!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.newMessage;
      
            return {...prev, chat: {messages: [newMessage]}};
      
          },
          onError: (err) => console.info(err, data, loading)
        })
      }
     
      return children({
        error,
        data,
        loading,
        subscribeMessages
      //   subscribeMessages: () => subscribeToMore({
      //   document: NEW_MESSAGE_SUBSCRIPTION,
      //   variables: { chatId: variables.id },
      //   updateQuery: (prev, { subscriptionData }) => {
      //     console.log("prev", prev)
      //     console.log("SubscriptioNData:", subscriptionData);
      //     if (!subscriptionData.data) return prev;
      //     const newMessage = subscriptionData.data.newMessage;
    
      //     return {...prev, chat: {messages: [newMessage]}};
    
      //   },
      //   onError: (err) => console.error("subscriptionError", err)
      // })
      })
    }}
  </Query>
  )
  
};

export default ChatDetailsQuery;

