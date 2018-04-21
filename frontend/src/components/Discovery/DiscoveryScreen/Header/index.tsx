import * as React from 'react';
import { Navigator } from 'react-native-navigation'
import { 
    View, 
    Button,
    Text
 } from 'react-native';

import {
    FILTER_FORM_SCREEN
} from '../../../../constants/screens';


class Header extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
    
                <Text>Discovery</Text>
            </View>
        )
    }

}

export default Header;