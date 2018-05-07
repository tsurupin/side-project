import * as React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles';

type Skill = {
    id: number,
    name: string
}
type Props = {
    data?: {
        networkStatus: number | null,
        loading: boolean | null,
        error: any | null,
        data: any | null,
    },
    parentProps: {
        onPressSkill: (skill: Skill) => void
    }
}

class SkillList extends React.Component<Props> {
    constructor(props) {
        super(props);
    }

    renderSkill = (skill: Skill) => {
        return (
            <ListItem
                key={skill.id}
                containerStyle={styles.listItemContainer}
                title={skill.name}
                onPress={() => this.props.parentProps.onPressSkill(skill)}
            />
        )
    }

    render() {
        const { networkStatus, loading, error, data} = this.props.data;
        if (networkStatus == 4) return <Text>Refetching</Text>;
        if (loading) return <Text>{loading} </Text>;
        if (error) {
            console.log(error) 
            return <Text>{error.message}</Text>;
        }
        
        const skills = data["skills"];
        return (
            <View style={styles.listContainer}>
                {skills.map((skill: Skill) => {
                    return this.renderSkill(skill)
                })}
            </View>
        );
    }
}

export default SkillList;

