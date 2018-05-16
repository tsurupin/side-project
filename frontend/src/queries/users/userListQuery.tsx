import * as React from 'react';
import { Query } from 'react-apollo';
import { USER_LIST_QUERY } from "../../graphql/users";

type Condition = {
    genreId?: number,
    occupationTypeId?: number,
    skillIds?: number[],
    isActive?: boolean,
    distance?: number
}

type Props = {
    variables: Condition,
    children: any
};

const UserListQuery = (props: Props) => {
    const { variables, children } = props;

    return(
        <Query 
            query={USER_LIST_QUERY}
            variables={variables}
            context={{needAuth: false}}
            notifyOnNetworkStatusChange  
        >
            {({error, loading, data})  => {
                return children({data, error, loading})
            }}
        </Query>
    )
};

export default UserListQuery;
