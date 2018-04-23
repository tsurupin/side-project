import * as React from 'react';

import { View,Text } from 'react-native';
import {
    DISCOVER_SCREEN,
    SKILL_SEARCH_FORM_SCREEN
} from '../../../constants/screens';

import {
    TouchableOpacity,
    Text
} from 'react-native';

import { 
    Container, 
    Header, 
    Title, 
    Content, 
    Button, 
    Icon, 
    Right, 
    Body, 
    Left, 
    Picker, 
    Form 
} from "native-base";

import styles from './styles';

type Props = {
    navigator: any,
    genreId: number,
    interestId?: number | null,
    distance?: number | null,
    isActive?: boolean | null,
    skillIds?: number[],
    distances: any[],
    interests: any[],
    activeness: any[]
};

type State = {
    genreId: number,
    interestId?: number | null,
    distance?: number | null,
    isActive?: boolean | null,
    skillIds?: number[]
}
class FilterFormScreen extends React.Component<Props, State> {
    static defaultProps = {
        genreId: 1,
        distance: null,
        interestId: null,
        isActive: null,
        skillIds: null,
        genres: [
            {
                id: 1,
                name: "Engineer"
            },
            {
                id: 2,
                name: "Designer"
            },
            {
                id: 3,
                name: "Hastler"
            },

        ],
        distances: [
            {
                name: "5 miles",
                value: 5,

            },
            {
                name: "10 miles",
                value: 10,
            },
            {
                name: "20 miles",
                value: 20
            },
            {
                name: "doesn't care",
                value: null
            }
        ],
        interests: [
            {
                name: "Education",
                value: 1
            },
            {
                name: "Finance",
                value: 2
            }
        ],
        activeness: [
            {
                name: "Active within 72 hours",
                value: true
            },
            {
                name: "Not Active",
                value: false
            }
        ]

    }

    constructor(props) {
        super(props);
        console.log(props);
        console.log("filterform")
        this.state = {
            genreId: props.genreId,
            distance: props.distance,
            interestId: props.interestId,
            isActive: props.isActive,
            skillIds: props.skillIds
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigationEvent = (e) => {
        if (e.type !== 'NavBarButtonPress') { return;}
        switch (e.id) {
          case "SubmitButton":
            this.props.navigator.push({
              screen: DISCOVER_SCREEN,
              passProps: {
                id: 1
              }
            })
            break;
        case "CancelButton":
            this.props.navigator.push({
                screen: DISCOVER_SCREEN,
                passProps: {

                }
            })    
            break;
        }

    }
    onPressSkillButton = () => {
        console.log("onPressSkillButton")
        console.log(this.props.navigator,  SKILL_SEARCH_FORM_SCREEN)
        this.props.navigator.push({
            screen: SKILL_SEARCH_FORM_SCREEN,
            passProps: {}
        })
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder="Select person's type"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={styles.pickerContainer}
                            selectedValue={this.state.genreId}
                            onValueChange={(e) => this.setState({genreId: e.value}) }
                        >
                            {this.props.genres.map(genre => {
                                return <Picker.Item label={genre.name} value={genre.id} />
                            })}
                            
                        </Picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder="Select distance"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={styles.pickerContainer}
                            selectedValue={this.state.distance}
                            onValueChange={(e) => this.setState({distance: e.value}) }
                        >
                            {this.props.distances.map(distance => {
                                return <Picker.Item label={distance.name} value={distance.value} />
                            })}
                            
                        </Picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder="Select person's interest"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={styles.pickerContainer}
                            selectedValue={this.state.interestId}
                            onValueChange={(e) => this.setState({interestId: e.value}) }
                        >
                            {this.props.interests.map(interest => {
                                return <Picker.Item label={interest.name} value={interest.id} />
                            })}
                            
                        </Picker>
                        
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder="Select person's activeness"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={styles.pickerContainer}
                            selectedValue={this.state.interestId}
                            onValueChange={(e) => this.setState({isActive: e.value}) }
                        >
                            {this.props.activeness.map(active => {
                                return <Picker.Item label={active.name} value={active.value} />
                            })}
                            
                        </Picker>
                        <View style={styles.buttonFormBox}>
                            <Text style={styles.textLabel}>Skill</Text>
                            <Button iconLeft primary onPress={this.onPressSkillButton}>
                                <Icon name='beer' />
                            </Button>
                        </View>
                        </Form>
                </Content>
            </Container>
        )
    }

}

export default FilterFormScreen;
