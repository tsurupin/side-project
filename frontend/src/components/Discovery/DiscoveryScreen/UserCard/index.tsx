import * as React from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
  
import styles from './styles';

type Props = {
    user: User
}
type User = {
    id: number,
    displayName: string,
    mainPhotoUrl: string,
    areaName: string,
    leadSentence: string
};
class UserCard extends React.Component<Props, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>{user.displayName}</Text>
                        <Text style={styles.area}>{user.areaName}</Text>
                    </View>
                </View>


            </View>
        )
    }
}

export default UserCard;