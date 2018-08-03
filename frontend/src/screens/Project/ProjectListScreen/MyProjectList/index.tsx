import * as React from "react";
import { View, Text } from "react-native";
import { MyProjectListQuery } from "../../../../queries/projects";
import { ProjectCore } from "../../../../interfaces";
import { ProjectRow } from "../../../../components/Project/MyProjectListScreen";

type Props = {
  onPress: (string) => void;
};

const MyProjectList: React.SFC<Props> = (props) => {
  return (
    <View>
      <MyProjectListQuery>
        {({ data, loading, error }) => {
          console.log(error);
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

          const projects: ProjectCore[] = data.myProjects;

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
      </MyProjectListQuery>
    </View>
  );
};

export default MyProjectList;
