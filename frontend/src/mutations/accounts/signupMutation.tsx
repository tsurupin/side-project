import * as React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_MUTATION } from "../../graphql/accounts";

type parentProps = {
    updateFirebase: (string) => any,
    updateErrorMessage: (string) => any
};

const SignupMutation = (variables: {providerId: string, uid: string}, parentProps: parentProps) => {
   return( 
    <Mutation mutation={SIGNUP_MUTATION}>
            {(signupMutation, { data, error, loading}) => {
                console.log(data);
                console.log(error);    
                if (error) { return parentProps.updateErrorMessage(error) }
                if (data && data["signupMutation"]) {
                    return parentProps.updateFirebase(data["signupMutation"]["token"]);
                }        
                signupMutation({variables});
            }}
        </Mutation>
   );
};

export default SignupMutation;