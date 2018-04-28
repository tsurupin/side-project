import * as React from 'react';
import { compose, Query } from 'react-apollo';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Input } from 'react-native-elements';
import { FILTER_FORM_SCREEN } from '../../../constants/screens';

import { SKILLS_QUERY } from "../../../graphql/skills";
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

    renderCandidateSkills = (skills: Skill[]) => {
        return (
            <View style={styles.listContainer}>
                {skills.map(skill => {
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

    renderSkillList = () => {
        return (
            <Query
                query={SKILLS_QUERY}
                variables={{name: this.state.name}}
                skip={!this.state.name}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    console.log("query--")
                    console.log(loading, error, data, networkStatus)

                    if (networkStatus == 4) return <Text>Refetching</Text>;
                    if (loading) return <Text>{loading} </Text>;
                    if (error) {
                        console.log(error) 
                        return <Text>{error.message}</Text>;
                    }
                    console.log(data)    
                    return this.renderCandidateSkills(data)
                    
                }}
            </Query>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <Input
                    placeholder='Skill(ex: Ruby)'
                    containerStyle={styles.inputContainer}
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name})}
                    onKeyPress={this.submitSkill}
                    errorStyle={styles.errorMessage}
                    errorMessage={this.state.errorMessage}
                />
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