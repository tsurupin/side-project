
import * as React from 'react';
import { View, Text } from 'react-native';
import UserCard from '../UserCard';

import styles from './styles';


type User = {
    id: number,
    displayName: string,
    mainPhotoUrl: string,
    areaName: string,
    leadSentence: string,
    genreName: string
}

type Props = {
    users: User[]
    onPressUserCard: (user: User) => void
}
class UserList extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }

    
    renderUserCard = (user) => {
        return <UserCard key={user.id} user={user} onPressUserCard={this.props.onPressUserCard} />
    }
    
    render() {
        console.log("UserList", this.props);
    
        // const { networkStatus, loading, error, data} = this.props.data;
        // if (networkStatus == 4) return <Text>Refetching</Text>;
        // if (loading) return <Text>{loading} </Text>;
        // if (error) {
        //     console.log(error) 
        //     return <Text>{error.message}</Text>;
        // }
    
        if (this.props.users.length == 0) {
            return (
              <View key={0}>
                <Text>No Users Found</Text>
              </View>
            )
          }
        return(
            <View>
                {this.props.users.map(user => {
                    return this.renderUserCard(user)
                })}
            </View>
        )
    }
}

export default UserList;