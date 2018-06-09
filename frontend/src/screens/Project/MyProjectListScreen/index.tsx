import * as React from "react";
import { View, Text } from "react-native";
import { MyProjectListQuery } from "../../../queries/projects";
import { ProjectCore } from "../../../interfaces";
import { ProjectRow } from "../../../components/Project/MyProjectListScreen";
import { PROJECT_DETAILS_SCREEN } from "../../../constants/screens";

type Props = {
  navigator: any;
};

class MyProjectListScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  handlePress = (id: string) => {
    this.props.navigator.push({
      screen: PROJECT_DETAILS_SCREEN,
      passProps: { id }
    });
  };

  render() {
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

            const projects: ProjectCore[] = data.projectList;

            return projects.map(project => {
              return (
                <ProjectRow
                  key={project.id}
                  project={project}
                  onPress={this.handlePress}
                />
              );
            });
          }}
        </MyProjectListQuery>
      </View>
    );
  }
}

export default MyProjectListScreen;
