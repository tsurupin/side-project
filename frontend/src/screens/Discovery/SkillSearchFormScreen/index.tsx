import * as React from 'react';
import { compose, Query, Mutation } from 'react-apollo';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Input } from 'react-native-elements';
import { FILTER_FORM_SCREEN } from '../../../constants/screens';
import SkillList from '../../../components/Discovery/SkillSearchFormScreen/SkillList';
import SkillsQuery  from '../../../queries/skills/skillsQuery';
import { SKILLS_QUERY, CREATE_SKILL_MUTATION } from "../../../graphql/skills";
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


    renderSkillList = () => {
        const { name } = this.state;
        return SkillsQuery({name}, {onPressSkill: this.onPressSkill}, SkillList)
    }

    renderTextForm = () => {
        return (
            <Mutation mutation={CREATE_SKILL_MUTATION}>
                {(createSkillMutation, { data, error, loading}) => {
                    console.log(data);
                    console.log(error);
                    let errorMessage;
                    if (error) { errorMessage = error.message;}
                    if (data && data["createSkill"]) { return this.moveBack(data["createSkill"]) }
                         
                    return(
                        <Input
                            placeholder='Skill(ex: Ruby)'
                            containerStyle={styles.inputContainer}
                            value={this.state.name}
                            onChangeText={(name) => this.setState({name})}
                            onSubmitEditing={() => {
                                createSkillMutation({variables: { name: this.state.name }});
                            }}
                            errorStyle={styles.errorMessage}
                            errorMessage={errorMessage}
                        />
                    )
                }}
            </Mutation>
        );

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
