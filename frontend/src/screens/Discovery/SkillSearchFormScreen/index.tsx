import * as React from 'react';
import { compose, Query, Mutation } from 'react-apollo';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Input } from 'react-native-elements';
import { FILTER_FORM_SCREEN } from '../../../constants/screens';

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

    renderCandidateSkills = (skills: Skill[]) => {
        return (
            <View style={styles.listContainer}>
                {skills.map((skill: Skill) => {
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
                onPress={() => this.onPressSkill(skill)}
            />
        )
    }

    renderSkillList = () => {
        const { name } = this.state;
        return (
            <Query
                query={SKILLS_QUERY}
                variables={{name}}
                skip={!this.state.name}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
            
                    if (networkStatus == 4) return <Text>Refetching</Text>;
                    if (loading) return <Text>{loading} </Text>;
                    if (error) {
                        console.log(error) 
                        return <Text>{error.message}</Text>;
                    }
                    return this.renderCandidateSkills(data["skills"])            
                }}
            </Query>
        )
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

// const PresentationalComponent = ({ myCustomProp }) => {
// // render some UI based on the data passed into myCustomProp
// }
// const DataFetchingComponent = () => (
//   <Query query={MY_QUERY}>
//     {({ loading, error, data }) => {
//       if (loading) return <Loading/>
//       if (error) return <Error/>
//       return <PresentationalComponent myCustomProp={data} />
//     }}
//   </Query>
// );