import * as React from "react";
import { View, Text } from "react-native";
import { MyProjectListQuery } from "../../../queries/projects";
import { ProjectCore } from "../../../interfaces";
import { ProjectRow } from "../../../components/Project/MyProjectListScreen";
import { LIKED_PROJECT_DETAILS_SCREEN } from "../../../constants/screens";
import {
  PROJECT_NEW_BUTTON,
  BACK_BUTTON,
  SUBMIT_BUTTON
} from "../../../constants/buttons";
import { PROJECT_NEW_SCREEN } from "../../../constants/screens";

type Props = {
  navigator: any;
};

class ProjectListScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case PROJECT_NEW_BUTTON:
        this.props.navigator.showModal({
          screen: PROJECT_NEW_SCREEN,
          navigatorButtons: {
            rightButtons: [
              {
                title: "Create",
                id: SUBMIT_BUTTON
              }
            ]
          }
        });
    }
  };

  handlePress = (id: string) => {
    this.props.navigator.push({
      screen: LIKED_PROJECT_DETAILS_SCREEN,
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

            const projects: ProjectCore[] = data.myProjects;

            return projects.map((project) => {
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
