import { graphql, NamedProps, QueryProps } from 'react-apollo';
import SUBMIT_COMMENT from '../../graphql/comments/submitCommentMutation.graphql';


type Response = {
  id: string,
  content: string
};

type InputProps = {
  repoName: string
};

const submitComment = graphql<Response, InputProps>(SUBMIT_COMMENT, {
  name: 'submit',
  options: (props) => ({
    variables: {
      repoName: 'test'
    }
  }),
  props: ({submit}: NamedProps<{submit: QueryProps & Response}, InputProps>): Response => {
    return submit;
  }
});

export default submitComment;
