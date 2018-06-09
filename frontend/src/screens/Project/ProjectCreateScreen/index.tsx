import * as React from "react";
import { View, TouchableOpacity, Text, Button, Alert } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { EditForm } from "../../../components/Project/ProjectEditScreen";
import { ProjectEditParams } from "../../../interfaces";
import { CreateProjectMutation } from "../../../mutations/projects";
import { PROJECT_DETAILS_SCREEN } from "../../../constants/screens";

import styles from "./styles";

type Props = {
  navigator: any;
};

class ProjectEditScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  handleSubmit = (variables: ProjectEditParams, createProjectMutation: any) => {
    createProjectMutation({ variables });
  };

  render() {
    return (
      <CreateProjectMutation>
        {({ createProjectMutation, data, loading, error }) => {
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
          if (data) {
            this.props.navigator.push({
              screen: PROJECT_DETAILS_SCREEN,
              passProps: { id: data.createProject.id }
            });
          }  

          return (
            <EditForm
              onSubmit={(projectEditParams: ProjectEditParams) =>
                this.handleSubmit(projectEditParams, createProjectMutation)
              }
              loading={loading}
              error={error}
              navigator={this.props.navigator}
            />
          );
        }}
      </CreateProjectMutation>
    );
  }
}

export default ProjectEditScreen;
