import * as React from 'react';
import {
    View,
    Image
} from 'react-native';

import { 
    Card,
    Text,
    Divider,
    Badge
} from 'react-native-elements';


import styles from './styles';
import { lexicographicSortSchema } from 'graphql';


type User = {
    id: number,
    displayName: string,
    mainPhotoUrl: string,
    areaName: string,
    leadSentence: string,
    genreName: string
};

type Props = {
    user: User,
    onPressUserCard?: (user: User) => void
}

class UserCard extends React.Component<Props, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        console.log("USerCard", user);
        const { mainPhotoUrl, areaName, displayName, leadSentence, genreName } = user;
        console.log("USerCard", mainPhotoUrl, areaName, displayName, leadSentence, genreName);
        return (
            <View style={[styles.container]}>
                <Card
                    image={{uri: mainPhotoUrl}}
                    imageStyle={styles.imageBox}
                >
                    <View style={styles.titleBox}>
                        <Text style={styles.mainText}>
                            {displayName}
                        </Text>
                        <Badge
                            value={genreName}
                            containerStyle={styles.badgeContainer}
                            textStyle={styles.badgeText}
                        />
                    </View>
                    <Text style={styles.mainText}>
                            {areaName}
                    </Text>
                    <Divider style={styles.divider} />
                    <Text style={styles.leadSentence}>
                        {leadSentence}
                    </Text>
                </Card>

            </View>
        )
    }
}

export default UserCard;