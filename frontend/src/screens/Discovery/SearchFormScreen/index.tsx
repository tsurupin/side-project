import * as React from 'react';

import {
    SKILL_SEARCH_MODAL_SCREEN
} from '../../../constants/screens';

import {
    View,
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

import { 
    Skill,
    Genre,
    OccupationType,
    UserSearchParams 
} from '../../../interfaces';
import styles from './styles';

type Props = {
    navigator: any,
    genres: Genre[],
    occupationTypes: OccupationType[],
    distance?: number | null,
    isActive?: boolean | null,
    skillIds?: number[],
    distances: any[],
    interests: any[],
    activeness: any[],
    skills: Skill[],
    client: any,
    onSubmit: (searchParams: UserSearchParams) => void
};

type State = {
    genreId: number,
    occupationTypeId?: number | null,
    distance?: number | null,
    isActive?: boolean | null,
    skillIds?: number[],
    skills: Skill[],
}

class SearchFormScreen extends React.Component<Props, State> {
    static defaultProps = {
        genreId: 1,
        distance: null,
        occupationTypeId: 1,
        isActive: null,
        skillIds: null,
        occupationTypes: [
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
        genres: [
            {
                name: "Education",
                id: 1
            },
            {
                name: "Finance",
                id: 2
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
            occupationTypeId: props.occupationTypeId,
            isActive: props.isActive,
            skillIds: props.skillIds,
            skills: props.skills
        }

        this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
    }

    componentWillReceiveProps(nextProps) {
        console.log("will receive", nextProps);

    }

    protected handleNavigationEvent = (e) => {
        if (e.type !== 'NavBarButtonPress') { return;}
        switch (e.id) {
          case "SubmitUserSarchButton":
          this.props.onSubmit({
                genreId: this.state.genreId,
                occupationTypeId: this.state.occupationTypeId,
                distance: this.state.distance,
                isActive: this.state.isActive,
                skillIds: this.state.skills.map(skill => skill.id)
            });
            this.props.navigator.dismissModal();
            break;
        case "CancelUserSearchButton":
            this.props.navigator.dismissModal();    
            break;
        }
    }

    protected handleSkillSearchShowModal = () => {
        this.props.navigator.showModal({
            screen: SKILL_SEARCH_MODAL_SCREEN,
            title: SKILL_SEARCH_MODAL_SCREEN,
            animationType: 'slide-up',
            passProps: {onPressSkill: this.handleAddSkill}
        })
    }

    protected handleValueChange = (key: string, value: string | number | boolean) => {
        let changeAttr = {};
        changeAttr[key] = value;
        this.setState(changeAttr);
    }

    protected handleAddSkill = (skill:Skill) => {
        const skills = Array.from(new Set(this.state.skills.concat(skill)));
        this.setState({skills});
    }

    protected handleDeleteSkill = (id: number) => {
        const skills = this.state.skills.filter(skill => skill.id !== id);
        this.setState({skills});
    }

    private renderSkillList = () => {
        return (
            <Content>
                {this.state.skills.map(skill => {
                    return(
                        <Button key={skill.id} rounded onPress={() => this.handleDeleteSkill(skill.id)}>
                            <Text>{skill.name}</Text>
                        </Button>
                    )
                })}
            </Content>
        )
    }

    render() {
    
        const { 
            genreId, 
            occupationTypeId,
            distance,
            isActive,
            skills
        } = this.state;
       
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
                                this.handleValueChange("genreId", value)
                            }}
                        >
                            {this.props.occupationTypes.map(occupationType => {
                                return <Picker.Item key={occupationType.id} label={occupationType.name} value={occupationType.id} />
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
                            onValueChange={(value) => this.handleValueChange("distance", value) }
                        >
                            {this.props.distances.map((distance, i) => {
                                return <Picker.Item key={i} label={distance.name} value={distance.value} />
                            })}
                            
                        </Picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder="Select person's interest"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={styles.pickerContainer}
                            selectedValue={genreId}
                            onValueChange={(value) => this.handleValueChange("interestId", value) }
                        >
                            {this.props.genres.map(genre => {
                                return <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
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
                            onValueChange={(value) =>this.handleValueChange("isActive", value) }
                        >
                            {this.props.activeness.map((active, i) => {
                                return <Picker.Item key={i} label={active.name} value={active.value} />
                            })}
                            
                        </Picker>
                        <View style={styles.buttonFormBox}>
                            <Text style={styles.textLabel}>Skill</Text>
                            <Button iconLeft primary onPress={this.handleSkillSearchShowModal}>
                                <Icon name='beer' />
                            </Button>
                            {this.renderSkillList()}
                        </View>
                        </Form>
                </Content>
            </Container>
        )
    }

}

export default SearchFormScreen;