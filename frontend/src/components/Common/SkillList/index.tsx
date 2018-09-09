import * as React from "react";
import { View } from "react-native";
import { Badge, Text } from "react-native-elements";
import { Skill } from "../../../interfaces";
import styles from "./styles";

type Props = {
  skills: Skill[];
};
const SkillList: React.SFC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Skills</Text>
      <View style={styles.badgeListContainer}>
        {props.skills.map((skill, i) => {
          let style = i === 0 ? styles.badgeFirstContainer : styles.badgeContainer;

          return (
            <Badge
              key={skill.id}
              value={skill.name}
              containerStyle={[
                style,
                { width: 16 * skill.name.length} 
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
