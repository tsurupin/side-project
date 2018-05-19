import * as React from "react";
import { Mutation } from "react-apollo";
import { LOGOUT_MUTATION } from "../../graphql/accounts";

const LogoutMutation = (props: any) => {
  const { children } = props;

  return (
    <Mutation mutation={LOGOUT_MUTATION}>
      {(logoutMutation, { data, error, loading }) => {
        console.log(data);
        console.log(error);
        if (loading) {
          return children({ loading });
        }
        if (error) {
          return children({ error });
        }
        return children({ logoutMutation });
      }}
    </Mutation>
  );
};

export default LogoutMutation;
