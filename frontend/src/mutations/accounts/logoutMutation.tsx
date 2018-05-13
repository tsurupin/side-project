import * as React from 'react';
import { Mutation } from 'react-apollo';
import { LOGOUT_MUTATION } from "../../graphql/accounts";

type parentProps = {
    openMainTab: () => any,
    updateErrorMessage: (string) => any
};

const LogoutMutation = (parentProps: parentProps) => (
    <Mutation mutation={LOGOUT_MUTATION}>
        {(logoutMutation, { data, error, loading}) => {
            console.log(data);
            console.log(error);    
            if (error) { return parentProps.updateErrorMessage(error) }        
            
            if (data && data["logoutMutation"]) {
                console.log('logout');
                return;
            }
            logoutMutation();
        }}
    </Mutation>
);

export default LogoutMutation;