import * as React from "react";
import { View, Text } from "react-native";
import { EditableProjectListQuery } from "../../../../queries/projects";
import { ProjectCore } from "../../../../interfaces";
import { ProjectList } from "../../../../components/Project/MyProjectListScreen";

type Props = {
  onPress: (string) => void;
};

const EditableProjectList: React.SFC<Props> = (props) => {
  const { onPress } = props;
  return (
    <View>
      <EditableProjectListQuery>
        {({ data, loading, error }) => {
          console.log(error, data);
          if (loading)
            return (
              <View>
                <Text> Text</Text>
              </View>
            );
          if (error)
            return (
              <View>
                <Text> Error</Text>
              </View>
            );

          const projects: ProjectCore[] = data.editableProjects;

          return <ProjectList projects={projects} onPress={onPress} />;
        }}
      </EditableProjectListQuery>
    </View>
  );
};

export default EditableProjectList;
