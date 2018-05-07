import * as React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Input } from 'react-native-elements';
import { FILTER_FORM_SCREEN } from '../../../constants/screens';
import { SkillInput, SkillList } from '../../../components/Discovery/SkillSearchModalScreen';
import { SkillsQuery }  from '../../../queries/skills';
import { CreateSkillMutation }  from '../../../mutations/skills';
import styles from './styles';
;

type Skill = {
    id: number,
    name: string
};

type Props = {
    navigator?: any,
    skills: Skill[],
    client: any,
    updateSkills: (skill: Skill) => void,
};

type State = {
    name: string,
    errorMessage?: string

};

class SkillSearchModalScreen extends React.Component<Props, State> {

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

    onPressSkill = (skill: Skill) => {
        this.props.updateSkills(skill);
        this.props.navigator.dismissModal();
    }

    onChangeText = (name: string) => {
        this.setState({name});
    }

    moveBack = () => {
        this.props.navigator.dismissModal()
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


export default SkillSearchModalScreen;
