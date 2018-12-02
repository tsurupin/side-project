import * as React from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_MESSAGE_MUTATION } from '../../graphql/chats';

type Props = {
  children: any;
};

const CreateMessageMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={CREATE_MESSAGE_MUTATION} context={{ needAuth: true }}>
      {(createMessageMutation, { loading, error, data }) => {
        return children({ createMessageMutation, loading, error, data });
      }}
    </Mutation>
  );
};

export default CreateMessageMutation;
