import * as React from 'react';
import { Query } from 'react-apollo';
import { USER_DETAILS_QUERY } from "../../graphql/users";

const UserDetailsQuery = (props: { variables: {id: number}, children: any}) => {
    const { variables, children } = props;
    return(
        <Query 
            query={USER_DETAILS_QUERY}
            variables={variables}
            context={{needAuth: true}}
            notifyOnNetworkStatusChange  
        >
        {(data) => children({...data})}
    </Query>
    )
};

export default UserDetailsQuery;
