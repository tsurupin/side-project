import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ProjectCore } from "../../../../interfaces";

type Props = {
  project: ProjectCore;
  onPress: (id: string) => void;
};

const ProjectRow = (props: Props) => {
  const { onPress, project } = props;
  return (
    <View>
      <TouchableOpacity onPress={() => onPress(project.id)}>
        <Text>{project.id}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProjectRow;
