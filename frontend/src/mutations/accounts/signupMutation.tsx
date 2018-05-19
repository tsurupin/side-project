import * as React from "react";
import { Mutation } from "react-apollo";
import { SIGN_UP_MUTATION, LOGIN_MUTATION } from "../../graphql/accounts";
import LoginMutation from "./loginMutation";

const SignUpMutation = (props: { children: any }) => {
  const { children } = props;

  return (
    <Mutation mutation={SIGN_UP_MUTATION}>
      {(signUpMutation, { loading, error, data }) => {
        if (loading) {
          return children({ loading });
        }
        if (error) {
          console.error("signUpMutation", error);
          return children({ error });
        }

        return (
          <Mutation mutation={LOGIN_MUTATION}>
            {(loginMutation, { error, loading }) => {
              console.log(error);
              if (loading) {
                return children({ loading });
              }
              if (error) {
                console.error("loginMutation", error);
                return children({ error });
              }
              return children({ signUpMutation, loginMutation, data });
            }}
          </Mutation>
        );
      }}
    </Mutation>
  );
};

export default SignUpMutation;
