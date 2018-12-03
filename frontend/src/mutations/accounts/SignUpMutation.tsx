import * as React from 'react';
import { Mutation } from 'react-apollo';
import { SIGN_UP_MUTATION, LOGIN_MUTATION } from '../../graphql/accounts';

type Props = {
  children: any;
};

const SignUpMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={SIGN_UP_MUTATION}>
      {(signUpMutation, signUpData) => {
        console.log('signupMutation', signUpData);

        return (
          <Mutation mutation={LOGIN_MUTATION}>
            {(loginMutation, loginData) => {
              console.log('loginMutation', loginData);
              const error = signUpData.error || loginData.error;
              const loading = signUpData.loading;
              return children({
                signUpMutation,
                loginMutation,
                loading,
                error,
                signUpData: signUpData.data,
                loginData: loginData.data
              });
            }}
          </Mutation>
        );
      }}
    </Mutation>
  );
};

export default SignUpMutation;
