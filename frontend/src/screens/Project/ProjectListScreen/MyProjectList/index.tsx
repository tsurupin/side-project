import * as React from "react";
import { View } from "react-native";
import { MyProjectListQuery } from "../../../../queries/projects";
import { ProjectCore } from "../../../../interfaces";
import { ProjectList } from "../../../../components/Project/MyProjectListScreen";
import { LoadingIndicator, ErrorMessage } from "../../../../components/Commons";

type Props = {
  onPress: (string) => void;
};

const MyProjectList: React.SFC<Props> = (props) => {
  const { onPress } = props;
  return (
    <View>
      <MyProjectListQuery>
        {({ data, loading, error }) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const projects: ProjectCore[] = data.myProjects;

          return <ProjectList projects={projects} onPress={onPress} />;
        }}
      </MyProjectListQuery>
    </View>
  );
};

export default MyProjectList;
