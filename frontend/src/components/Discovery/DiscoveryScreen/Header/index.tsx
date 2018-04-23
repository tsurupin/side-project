import * as React from 'react';
import { Navigator } from 'react-native-navigation'
import { 
    View, 
  
 } from 'react-native';
 import { Container, Header as InnerHeader, Left, Body, Right, Button, Icon, Title } from 'native-base';

import {
    FILTER_FORM_SCREEN
} from '../../../../constants/screens';


class Header extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <InnerHeader>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                            </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                </InnerHeader>
            </Container>
        )
    }

}

export default Header;