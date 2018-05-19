import * as React from "react";
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION } from "../../graphql/accounts";

const LoginMutation = (props: any) => {
  const { children } = props;
  console.log(children);
  return (
    <Mutation mutation={LOGIN_MUTATION}>
      {(loginMutation, { data, error, loading }) => {
        console.log(data);
        console.log(error);
        if (loading) {
          return children({ loading });
        }
        if (error) {
          return children({ error });
        }
        return children({ ...props, loginMutation: loginMutation });
      }}
    </Mutation>
  );
};

export default LoginMutation;
