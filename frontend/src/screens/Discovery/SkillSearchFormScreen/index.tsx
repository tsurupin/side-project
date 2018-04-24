import * as React from 'react';

import { View } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import { FILTER_FORM_SCREEN } from '../../../constants/screens';

import styles from './styles';

type Skill = {
    id: number,
    name: string
};

type Props = {
    navigator?: any,
    skills: Skill[],
    fetchSkills: (string) => any,
    createSkill: (string) => any
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
    }


    onPressSkill = (skill: Skill) => {
        this.moveBack(skill);
    }

    moveBack = (skill: Skill | null) => {
        this.props.navigator.push({
            screen: FILTER_FORM_SCREEN,
            passProps: {skill}
        })
    }

    searchSkills = async (event) => {
        try {
            const { skills } = await this.props.fetchSkills(event.value);
            this.setState(skills)
        } catch(e) {
            this.setState({errorMessage: e.message});
        }
    }

    submitSkill = async (event) => {
        try {
            const { skill } = await this.props.createSkill(event.value);
            this.moveBack(skill)
        } catch(e) {
            this.setState({errorMessage: e.message});
        }

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
                title={skill.name}
                onPress={this.onPressSkill(skill)}
            />
        )
    }

    render() {
        return(
            <View>
                <Input
                    placeholder='Skill(ex: Ruby)'
                    containerStyle={styles.inputContainer}
                    value={this.state.name}
                    onChangeText={this.searchSkills}
                    onKeyPress={this.submitSkill}
                    errorStyle={styles.errorMessage}
                    errorMessage={this.state.errorMessage}
                />
                {this.renderCandidateSkills()}
            </View>
        )
    }
}

export default SkillSearchFormScreen;
