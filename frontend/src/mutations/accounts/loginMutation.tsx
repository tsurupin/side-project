import * as React from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN_MUTATION } from "../../graphql/accounts";

type parentProps = {
    openMainTab: () => any,
    updateErrorMessage: (string) => void
};

const LoginMutation = (parentProps: parentProps) => (
    <Mutation mutation={LOGIN_MUTATION}>
        {(loginMutation, { data, error, loading}) => {
            console.log(data);
            console.log(error);    
            if (error) { return parentProps.updateErrorMessage(error) };
            if (data && data["loginMutation"]) {
                return parentProps.openMainTab();
            }
            loginMutation();
        }}
    </Mutation>
);

export default LoginMutation;