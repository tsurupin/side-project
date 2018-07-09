import * as React from "react";
import { View } from "react-native";
import { Badge } from "react-native-elements";
import { Skill } from "../../../../interfaces";
import styles from "./styles";

type Props = {
  skills: Skill[]
}
const SkillList: React.SFC<Props> = props => {
  return(
    <View style={styles.container}>
      {
        props.skills.map((skill) => {
          return <Badge key={skill.id} value={skill.name} containerStyle={styles.badgeContainer} textStyle={styles.text} />
        })
      }
    </View>
  )
}

export default SkillList;