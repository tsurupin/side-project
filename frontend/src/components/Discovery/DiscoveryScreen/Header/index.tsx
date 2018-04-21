import * as React from 'react';
import { Navigator } from 'react-native-navigation'
import { 
    View, 
    Button,
    Text
 } from 'react-native';

import {
    FILTER_FORM_SCREEN
} from '../../constants/screens';


class Header extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <Button 
                    onPress={() => this.props.navigator.push({
                        screen: FILTER_FORM_SCREEN,
                    title: FILTER_FORM_SCREEN_TITLE
                    })}
                />
                <Text>Discovery</Text>
            </View>
        )
    }

}

export default Header;