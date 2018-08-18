import * as React from "react";
import { View, Text } from "react-native";
import { MyProjectListQuery } from "../../../../queries/projects";
import { ProjectCore } from "../../../../interfaces";
import { ProjectList } from "../../../../components/Project/MyProjectListScreen";

type Props = {
  onPress: (string) => void;
};

const MyProjectList: React.SFC<Props> = (props) => {
  const { onPress } = props;
  return (
    <View>
      <MyProjectListQuery>
        {({ data, loading, error }) => {
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

          return <ProjectList projects={projects} onPress={onPress} />;
        }}
      </MyProjectListQuery>
    </View>
  );
};

export default MyProjectList;
