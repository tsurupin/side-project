import * as React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Input } from 'react-native-elements';
import { FILTER_FORM_SCREEN } from '../../../constants/screens';
import { SkillInput, SkillList } from '../../../components/Discovery/SkillSearchFormScreen';
import { SkillsQuery }  from '../../../queries/skills';
import { CreateSkillMutation }  from '../../../mutations/skills';


import styles from './styles';

type Skill = {
    id: number,
    name: string
};

type Props = {
    navigator?: any,
    skills: Skill[]
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

    onPressSkill = (skill: Skill): null => {
        return this.moveBack(skill);
    }

    onChangeText = (name: string) => {
        this.setState({name});
    }

    moveBack = (skill: Skill | null): null => {
        this.props.navigator.push({
            screen: FILTER_FORM_SCREEN,
            passProps: {skill}
        })
        return null;
    }


    renderSkillList = () => {
        const { name } = this.state;
        return SkillsQuery({name}, {onPressSkill: this.onPressSkill}, SkillList)
    }

    renderTextForm = () => {
        const { name } = this.state;
        return CreateSkillMutation({name}, {onChangeText: this.onChangeText, moveBack: this.moveBack}, SkillInput)
    }

    render() {
        return(
            <View style={styles.container}>
                {this.renderTextForm()}
                {this.renderSkillList()}
            </View>
        )
    }
}


export default SkillSearchFormScreen;
