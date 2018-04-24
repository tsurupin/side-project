import * as React from 'react';
import { compose } from 'react-apollo';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Input } from 'react-native-elements';
import { FILTER_FORM_SCREEN } from '../../../constants/screens';

import  {
    fetchSkills
}  from '../../../queries/skills';
  
import  {
    createSkill
}  from '../../../mutations/skills';
  


import styles from './styles';

type Skill = {
    id: number,
    name: string
};

type Props = {
    navigator?: any,
    skills: Skill[],
    fetchSkills: ({variables: {term: string}}) => any,
    createSkill: ({variables: {name: string}}) => any
};

type State = {
    name: string,
    errorMessage?: string

};
class SkillSearchFormScreen extends React.Component<Props, State> {

    static defaultProps = {
        skills: []
    }
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        
        console.log(props)
    }

    componentWillMount() {
        console.log(this.props)
        console.log("sa")
    }


    onPressSkill = (skill: Skill): null => {
        return this.moveBack(skill);
    }

    moveBack = (skill: Skill | null): null => {
        this.props.navigator.push({
            screen: FILTER_FORM_SCREEN,
            passProps: {skill}
        })
        return null;
    }

    searchSkills = async (event) => {
        console.log("search", event, this.props)
        // try {
        //     const { skills } = await this.props.fetchSkills({variables: {term: event.value}});
        //     this.setState(skills)
        // } catch(e) {
        //     this.setState({errorMessage: e.message});
        // }
    }

    submitSkill = async (event) => {
        console.log("submit", event)
        // try {
        //     const { skill } = await this.props.createSkill({variables: {name: event.value}});
        //     this.moveBack(skill)
        // } catch(e) {
        //     this.setState({errorMessage: e.message});
        // }

    }

    renderCandidateSkills = () => {
        return (
            <View style={styles.listContainer}>
                {this.props.skills.map(skill => {
                    return this.renderSkill(skill)
                })}
            </View>
        );
    }

    renderSkill = (skill: Skill) => {
        return (
            <ListItem
                key={skill.id}
                containerStyle={styles.listItemContainer}
                title={skill.name}
                onPress={this.onPressSkill(skill)}
            />
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <Input
                    placeholder='Skill(ex: Ruby)'
                    containerStyle={styles.inputContainer}
                    value={this.state.name}
                    onChange={this.searchSkills}
                    onChangeText={() => console.log("changetex")}
                    onKeyPress={this.submitSkill}
                    errorStyle={styles.errorMessage}
                    errorMessage={this.state.errorMessage}
                />
                {this.renderCandidateSkills()}
            </View>
        )
    }
}

export default compose(
    fetchSkills,
    createSkill
  )(SkillSearchFormScreen);
