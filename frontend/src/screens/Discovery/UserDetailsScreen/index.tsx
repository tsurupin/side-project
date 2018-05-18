import * as React from 'react';

import {
    DISCOVERY_SCREEN
} from '../../../constants/screens';

import {
    View,
    TouchableOpacity,
    Text,
    Button
} from 'react-native';
import {
    ErrorMessage
} from '../../../components/Commons';
import { UserDetailsQuery }  from '../../../queries/users';
import { LikeUserMutation } from '../../../mutations/userLikes';

import styles from './styles';

type Props = {
    id: number
}

type State = {

}
class UserDetailsScreen extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    }

    private handleUserLikePress = (likeUserMutation) => {
        const { id } = this.props;
        likeUserMutation({variables: {id}});
    } 

    private renderLoadingIndicator = () => {
        return <View><Text>Indicator</Text></View>
    }

    private renderErrorMessage = (error: string) => {
        return <View><Text>{error}</Text></View>
    } 


    render() {
        const { id } = this.props;
        return(
            <UserDetailsQuery variables={{id}}>
            {({data, loading, error}) => {
                if (loading) return <View><Text> Text</Text></View>
                if (error) return <ErrorMessage message={error} />
                console.log(data)
                const { userDetails } = data;
                return(
                    <View>
                        <LikeUserMutation>
                            {({likeUserMutation, data, loading, error}) => {
                                if (loading) { return this.renderLoadingIndicator}
                                if (error) { return this.renderErrorMessage(error) }
                                if (data) {
                                    console.log(data)
                                    //TODO: move back to disscovery screen
                                }
                                return(
                                    <TouchableOpacity onPress={() => this.handleUserLikePress(likeUserMutation)}>
                                        <Text> UserLike </Text>
                                    </TouchableOpacity>
                                )
                            }}
                        </LikeUserMutation>
                    </View>
                )

            }}
            </UserDetailsQuery>

        )
    }

}

export default UserDetailsScreen;