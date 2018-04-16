import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { SUBMIT_COMMENT_MUTATION } from '../../graphql/comments';


type Response = {
  id: string,
  content: string
};

type InputProps = {
  repoName: string
};

type Variables = {
  repoName: string
};

const submitComment = graphql<InputProps, Response, Variables, Response>(SUBMIT_COMMENT_MUTATION, {
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
