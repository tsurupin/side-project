import * as React from "react";
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION } from "../../graphql/accounts";

type Props = {
  children: any;
};

const LoginMutation = (props: Props) => {
  const { children } = props;
  console.log(children);
  return (
    <Mutation mutation={LOGIN_MUTATION}>
      {(loginMutation, { data, error }) => {
        return children({ loginMutation, error, data });
      }}
    </Mutation>
  );
};

export default LoginMutation;
