import * as React from "react";
import { View, Text } from "react-native";
import { EditableProjectListQuery } from "../../../../queries/projects";
import { ProjectCore } from "../../../../interfaces";
import { ProjectRow } from "../../../../components/Project/MyProjectListScreen";

type Props = {
  onPress: (string) => void;
};

const EditableProjectList: React.SFC<Props> = (props) => {
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

          return projects.map((project) => {
            return (
              <ProjectRow
                key={project.id}
                project={project}
                onPress={props.onPress}
              />
            );
          });
        }}
      </EditableProjectListQuery>
    </View>
  );
};

export default EditableProjectList;
