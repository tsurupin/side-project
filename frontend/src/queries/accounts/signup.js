// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";

import SIGNUP_MUTATION from '../../graphql/accounts/signUpMutation.graphql';

type Response = {
  uid: string,
  token: string
};

type InputProps = {
  providerId: string,
  uid: string
};

const signup = graphql(SIGNUP_MUTATION, {
  name: 'signup',
  options: props => ({
    variables: {
      providerId: props.providerId,
      uid: props.uid,
    }
  })
});

export default signup;
