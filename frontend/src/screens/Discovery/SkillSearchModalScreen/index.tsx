import * as React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Input } from 'react-native-elements';
import { FILTER_FORM_SCREEN } from '../../../constants/screens';
import { SkillInput, SkillList } from '../../../components/Discovery/SkillSearchModalScreen';
import { SkillsQuery }  from '../../../queries/skills';
import { CreateSkillMutation }  from '../../../mutations/skills';
import { ApolloConsumer } from 'react-apollo';
import styles from './styles';
import { SELECTED_SKILLS_CLIENT_QUERY } from '../../../graphql/skills';

type Skill = {
    id: number,
    name: string
};

type Props = {
    navigator?: any,
    skills: Skill[],
    client: any,
};

type State = {
    name: string,
    errorMessage?: string

};

class SearchModalScreen extends React.Component<Props, State> {

    static defaultProps = {
        skills: []
    }
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            name: ''
        }
        
        console.log(props)
    }

    onPressSkill = (skill: Skill) => {
        const selectedSkills = this.getSelectedSkills();
        this.updateSelectedSkills(skill, selectedSkills);
        this.props.navigator.dismissModal();
    }

    onChangeText = (name: string) => {
        this.setState({name});
    }

    getSelectedSkills = (): Skill[] => {
        const query = SELECTED_SKILLS_CLIENT_QUERY;
        const data = this.props.client.readQuery({ query });
        return data.selectedSkills;
    }

    updateSelectedSkills = (newSkill: Skill, currentSkills: Skill[]) => {
        const query = SELECTED_SKILLS_CLIENT_QUERY;
        let selectedSkills;
        if (currentSkills.some(currentSkill => currentSkill.id === newSkill.id)) {
            selectedSkills = currentSkills;
        } else {
            selectedSkills = [...currentSkills, newSkill];
        }
        this.props.client.writeQuery({
            query,
            data: {selectedSkills}
        });
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



const SkillSearchModalScreen = (props) => (
    <ApolloConsumer>
        {client => (
            <SearchModalScreen {...props} client={client} />    
        )}
    </ApolloConsumer>
)
export default SkillSearchModalScreen;
