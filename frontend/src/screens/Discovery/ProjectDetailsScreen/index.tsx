import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ProjectDetailsQuery } from "../../../queries/projects";
import { BACK_BUTTON } from "../../../constants/buttons";
import styles from "./styles";
import { LikeProjectMutation } from "../../../mutations/projectLikes";
import {
  LIKED_PROJECT_DETAILS_SCREEN,
  USER_DETAILS_SCREEN
} from "../../../constants/screens";
import { ProjectDetailsBox } from "../../../components/Discovery/ProjectDetailsScreen";
import { ProjectDetails } from "../../../interfaces";
import { LoadingIndicator, ErrorMessage } from "../../../components/Common";

type Props = {
  id: string;
  navigator: any;
};

class ProjectDetailsScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== "NavBarButtonPress") return;

    switch (e.id) {
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  };

  private handlePress = (likeProjectMutation) => {
    likeProjectMutation({ variables: { projectId: this.props.id } });
  };

  private handleUserPress = (userId: string) => {
    this.props.navigator.push({
      screen: USER_DETAILS_SCREEN,
      passProps: {
        id: userId
      }
    });
  };

  render() {
    const { id } = this.props;
    return (
      <ProjectDetailsQuery variables={{ id }}>
        {({ data, loading, error }) => {
          console.log(error);
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const project: ProjectDetails = data.project;

          return (
            <View>
              <Text>{project.id}</Text>
              <LikeProjectMutation>
                {({ likeProjectMutation, data, loading, error }) => {
                  if (loading) return <LoadingIndicator />;
                  if (error) return <ErrorMessage {...error} />;
                  if (data) {
                  
                    this.props.navigator.push({
                      screen: LIKED_PROJECT_DETAILS_SCREEN,
                      passProps: { id }
                    });
                    return <View />;
                  }

                  return (
                    <ProjectDetailsBox
                      project={project}
                      liked={false}
                      onPressUser={this.handleUserPress}
                      like={() => this.handlePress(likeProjectMutation)}
                    />
                  );
                }}
              </LikeProjectMutation>
            </View>
          );
        }}
      </ProjectDetailsQuery>
    );
  }
}

export default ProjectDetailsScreen;
