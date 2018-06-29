import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ProjectDetailsQuery } from "../../../queries/projects";
import {
  BACK_BUTTON
} from "../../../constants/buttons";
import styles from "./styles";
import { LikeProjectMutation } from "../../../mutations/projectLikes";
import { LIKED_PROJECT_DETAILS_SCREEN } from "../../../constants/screens";
import { LikeButton } from "../../../components/Discovery/ProjectDetailsScreen";
import { ProjectDetails } from "../../../interfaces";

type Props = {
  id: string;
  navigator: any;
};

type State = {};

class ProjectDetailsScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = e => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  };

  private handlePressLike = (likeProjectMutation) => {
    likeProjectMutation({variables: {projectId: this.props.id}})
  }

  render() {
    const { id } = this.props;
    return (
      <ProjectDetailsQuery variables={{ id }}>
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

          const project: ProjectDetails = data;
          
          return (
            <View>
              <Text>{project.id}</Text>
              <LikeProjectMutation>
                {({ likeProjectMutation, data, loading, error }) => {
                  if (loading) {
                    <Text>loading</Text>
                  }
                  if (error) {
                    // Alert
                  }
                  if (data) {
                    // Alert
                    this.props.navigator.push({
                      screen: LIKED_PROJECT_DETAILS_SCREEN,
                      passProps: {id}
                    });
                    return <View />
                  }

                  return (
                    <LikeButton onPress={() => this.handlePressLike(likeProjectMutation)} name="Like This project" />
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
