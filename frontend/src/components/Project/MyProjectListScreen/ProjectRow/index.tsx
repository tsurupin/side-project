import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ProjectCore } from "../../../../interfaces";

type Props = {
  project: ProjectCore;
  onPress: (id: string) => void;
};

const ProjectRow: React.SFC<Props> = props  => {
  const { onPress, project } = props;
  return (
    <View>
      <TouchableOpacity onPress={() => onPress(project.id)}>
        <Text>{project.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProjectRow;
