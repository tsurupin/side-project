import { graphql, NamedProps, QueryProps } from 'react-apollo';
import * as SIGNUP_MUTATION from '../../graphql/accounts/signUpMutation.graphql';

type Response = {
  uid: string,
  token: string
};

type InputProps = {
  providerId: string,
  uid: string
};

type Variables = {
  providerId: string,
  uid: string
};

const signup = graphql<InputProps, Response, Variables>(SIGNUP_MUTATION, {
  name: 'signup',
  options: props => ({
    variables: {
      providerId: props.providerId,
      uid: props.uid,
    }
  })
});

export default signup;
