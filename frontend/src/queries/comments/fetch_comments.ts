import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { COMMENTS_QUERY, COMMENT_ADDED_SUBSCRIPTION } from '../../graphql/comments';

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


type Variables = {
    repoName: string
};

const fetchComments = graphql<InputProps, Response, Variables, Response>(COMMENTS_QUERY, {
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
                  document: COMMENT_ADDED_SUBSCRIPTION,
                  variables: {
                      repoName: 'test',
                  },
                  updateQuery: (prev: any, {subscriptionData}) => {
                      console.log(prev);
                      console.log(subscriptionData);
                      if (!subscriptionData.data) { return prev; }    

                      const newFeedItem = subscriptionData.data.commentAdded;

                      return {
                          ...prev, 
                          comments: [newFeedItem, ...prev.comments]
                        }
                  }
              });
          }
      };
  }
});

export default fetchComments;
