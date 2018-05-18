import * as React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles';

import { Skill } from '../../../../interfaces';

type Props = {
    // data?: {
    //     networkStatus: number | null,
    //     loading: boolean | null,
    //     error: any | null,
    //     data: any | null,
    // },
    skills: Skill[],
    onPressSkill: (skill: Skill) => void
    
}

class SkillList extends React.Component<Props> {
    constructor(props) {
        super(props);
    }

    private renderSkill = (skill: Skill) => {
        return (
            <ListItem
                key={skill.id}
                containerStyle={styles.listItemContainer}
                title={skill.name}
                onPress={() => this.props.onPressSkill(skill)}
            />
        )
    }

    render() {
        // const { networkStatus, loading, error, data} = this.props.data;
        // if (networkStatus == 4) return <Text>Refetching</Text>;
        // if (loading) return <Text>{loading} </Text>;
        // if (error) {
        //     console.log(error) 
        //     return <Text>{error.message}</Text>;
        // }
        
       
        return (
            <View style={styles.listContainer}>
                {this.props.skills.map((skill: Skill) => {
                    return this.renderSkill(skill)
                })}
            </View>
        );
    }
}

export default SkillList;

