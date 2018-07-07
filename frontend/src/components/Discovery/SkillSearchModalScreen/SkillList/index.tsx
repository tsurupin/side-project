import * as React from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import styles from "./styles";

import { Skill } from "../../../../interfaces";

type Props = {
  skills: Skill[];
  onPressSkill: (skill: Skill) => void;
};

class SkillList extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  private renderSkill = (skill: Skill) => {
    return (
      <ListItem
        key={skill.id}
        bottomDivider={true}
        containerStyle={styles.listItemContainer}
        title={skill.name}
        onPress={() => this.props.onPressSkill(skill)}
      />
    );
  };

  render() {
    return (
      <View style={styles.listContainer}>
        {this.props.skills.map((skill: Skill) => {
          return this.renderSkill(skill);
        })}
      </View>
    );
  }
}

export default SkillList;
