import * as React from 'react';
import { View } from 'react-native';
import { Badge, Text } from 'react-native-elements';
import { Skill } from '../../../interfaces';
import styles from './styles';

type Props = {
  skills: Skill[];
};
const SkillList: React.SFC<Props> = ({ skills }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Skills</Text>
      <View style={styles.badgeListContainer}>
        {skills.map((skill, i) => {

          return (
            <Badge
              key={skill.id}
              value={skill.name}
              containerStyle={[
                styles.badgeContainer,
                {
                  width: 16 * skill.name.length,
                  marginLeft: i === 0 ? 0 : 10,
                },
              ]}
              textStyle={styles.badgeText}
            />
          );
        })}
      </View>
    </View>
  );
};

export default SkillList;
