// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";

import SUBMIT_COMMENT from '../../graphql/comments/submitCommentMutation.graphql';


type Response = {
  id: string,
  content: string
};

type InputProps = {
  repoName: string
};

const submitComment: OperationComponent<Response, InputProps> = graphql(SUBMIT_COMMENT, {
  name: 'submit',
  options: (props: Object) => ({
    variables: {
      repoName: 'test'
    }
  })
});

export default submitComment;
