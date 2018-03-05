// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";

import COMMENT_SUBSCRIPTION from '../../graphql/comments/commentAddedSubscription.graphql';
import COMMENT_QUERY from '../../graphql/comments/commentsQuery.graphql';


type Comment = {
  id: string,
  content: string,
  repoName?: string
};
type Response = {
  comments: Array<Comment>
};

type InputProps = {
  repoName: string
};

const fetchComments: OperationComponent<Response, InputProps> = graphql(COMMENT_QUERY, {
  name: 'comments',
  options: (props: any) => ({
      variables: {
        repoName: 'test'
      },
      context: {
        needAuth: false
      },
  }),
  props: (props: any) => {
      return {
         ...props,
          subscribeToNewComments: params => {
              return props.comments.subscribeToMore({
                  document: COMMENT_SUBSCRIPTION,
                  variables: {
                      repoName: 'test',
                  },
                  updateQuery: (prev: any, {subscriptionData}) => {
                      console.log(prev);
                      console.log(subscriptionData);
                      if (!subscriptionData.data) {
                          return prev;
                      }

                      const newFeedItem = subscriptionData.data.commentAdded;

                      return Object.assign({}, prev, {
                          comments: [newFeedItem, ...prev.comments]
                      });
                  }
              });
          }
      };
  }
});

export default fetchComments;
