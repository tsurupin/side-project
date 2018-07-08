import * as React from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import styles from "./styles";

import { Skill } from "../../../../interfaces";

type Props = {
  skills: Skill[];
  onPressSkill: (skill: Skill) => void;
};

const renderSkill = (skill: Skill, fnc) => {
  return (
    <ListItem
      key={skill.id}
      bottomDivider={true}
      containerStyle={styles.listItemContainer}
      title={skill.name}
      onPress={() => fnc(skill)}
    />
  );
};

const SkillList: React.SFC<Props> = props => {
  return (
    <View style={styles.listContainer}>
      {props.skills.map((skill: Skill) => {
        return renderSkill(skill, props.onPressSkill);
      })}
    </View>
  );
  
}

export default SkillList;
