import * as React from 'react';
import { Query } from 'react-apollo';
import { USERS_QUERY } from "../../graphql/users";

type Condition = {
    genreId?: number,
    occupationTypeId?: number,
    skillIds?: number[],
    isActive?: boolean,
    distance?: number
}

const UsersQuery = (variables: Condition, parentProps, ChildComponent) => {
    return(
        <Query 
            query={USERS_QUERY}
            variables={variables}
            notifyOnNetworkStatusChange
            context={{needAuth: true}}
        >
        {(data) => {
            return <ChildComponent data={data} parentProps={parentProps} /> 
        }}
        </Query>
    )
};

export default UsersQuery;