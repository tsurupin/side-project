import * as React from 'react';

import { View,Text } from 'react-native';
import {
    DISCOVER_SCREEN,
    SKILL_SEARCH_MODAL_SCREEN
} from '../../../constants/screens';

import {
    SELECTED_SKILLS_CLIENT_QUERY
} from '../../../graphql/skills'
import {
    USER_FILTER_CONDITION_CLIENT_QUERY
} from '../../../graphql/users';

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

import { ApolloConsumer, Query } from 'react-apollo';

import styles from './styles';

type Skill = {
    id: number,
    name: string
}
type Props = {
    navigator: any,
    genreId: number,
    interestId?: number | null,
    distance?: number | null,
    isActive?: boolean | null,
    skillIds?: number[],
    distances: any[],
    interests: any[],
    activeness: any[],
    skills: Skill[],
    client: any
};

type State = {
    genreId: number,
    interestId?: number | null,
    distance?: number | null,
    isActive?: boolean | null,
    skillIds?: number[]
}

class FormScreen extends React.Component<Props, State> {
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
        ],
        skills: []

    }

    constructor(props) {
        super(props);
     
        this.state = {
            genreId: props.genreId,
            distance: props.distance,
            interestId: props.interestId,
            isActive: props.isActive,
            skillIds: props.skillIds
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent);
    }

    componentWillReceiveProps(nextProps) {
        console.log("will receive", nextProps);

    }

    onNavigationEvent = (e) => {
        if (e.type !== 'NavBarButtonPress') { return;}
        switch (e.id) {
          case "SubmitFilterButton":
            this.updateFilterCondition();
            this.props.navigator.dismissModal();
            break;
        case "CancelFilterButton":
            this.props.navigator.dismissModal();    
            break;
        }
    }

    onPressSkillButton = () => {
        this.props.navigator.showModal({
            screen: SKILL_SEARCH_MODAL_SCREEN,
            title: SKILL_SEARCH_MODAL_SCREEN,
            animationType: 'slide-up',
            passProps: this.state
        })
    }

    onValueChange = (key: string, value: string | number | boolean) => {
        let changeAttr = {};
        changeAttr[key] = value;
        this.setState(changeAttr);
    }

    deleteSkill = (id: number) => {
        // remove skill from query
    }

    updateFilterCondition = () => {
        const { genreId, interestId, distance, isActive } = this.state;
        const query = SELECTED_SKILLS_CLIENT_QUERY;
        const data = this.props.client.readQuery({ query });

        this.props.client.writeQuery({
            query: USER_FILTER_CONDITION_CLIENT_QUERY,
            data: {
                userFilterCondition: {
                    genreId,
                    interestId,
                    distance,
                    isActive,
                    selectedSkills: data.selectedSkills,
                    __typename: "UserFilterCondition"
                }
            }
        });
        this.props.client.readQuery({ query: USER_FILTER_CONDITION_CLIENT_QUERY });
    }


    renderSkillList = () => {
        return (
            <Query query={SELECTED_SKILLS_CLIENT_QUERY}>
            {data => {
                <Content>
                    {data.selectedSkills.map(skill => {
                        return(
                            <Button rounded onPress={this.deleteSkill(skill.id)}>
                                <Text>{skill.name}</Text>
                            </Button>
                        )
                    })}
                </Content>
            }}
            </Query>
        )
    }


    render() {
        console.log(this.props.client);
        console.log(this.props.skills)
        const { 
            genreId, 
            interestId,
            distance,
            isActive,
        } = this.state;
        console.log(genreId)
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
                            selectedValue={genreId}
                            onValueChange={(value) => {
                                this.onValueChange("genreId", value)
                            }}
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
                            selectedValue={distance}
                            onValueChange={(value) => this.onValueChange("distance", value) }
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
                            selectedValue={interestId}
                            onValueChange={(value) => this.onValueChange("interestId", value) }
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
                            selectedValue={isActive}
                            onValueChange={(value) =>this.onValueChange("isActive", value) }
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

const FilterFormScreen = (props) => (
<ApolloConsumer>
    {client => (
        <FormScreen {...props} client={client} />    
    )}
</ApolloConsumer>
)
export default FilterFormScreen;
