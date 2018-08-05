import * as React from "react";
import { View, TouchableOpacity, Text, Button, Alert } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { EditForm } from "../../../components/Project/Commons";
import { ProjectEditParams } from "../../../interfaces";
import { ProjectFormQuery } from "../../../queries/projects";
import { CreateProjectMutation } from "../../../mutations/projects";
import { PROJECT_DETAILS_SCREEN } from "../../../constants/screens";
import {
  BACK_BUTTON
} from "../../../constants/buttons";
import styles from "./styles";

type Props = {
  navigator: any;
};

class ProjectNewScreen extends React.Component<Props> {
  constructor(props) {
    super(props);

  }

  private handleSubmit = (variables: ProjectEditParams, createProjectMutation: any) => {
    createProjectMutation({ variables });
  };

  render() {
    return (
      <ProjectFormQuery>
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

          const projectFormData = data.projectForm;
          return (
            <View>
              <CreateProjectMutation>
                {({ createProjectMutation, data, loading, error }) => {
                  if (loading)
                    return (
                      <View>
                        <Text> Text</Text>
                      </View>
                    );
                  if (error) return <ErrorMessage {...error} />;
                  if (data) {
                    this.props.navigator.dismissAllModals({ animationType: 'none'});
                    this.props.navigator.push({
                      screen: PROJECT_DETAILS_SCREEN,
                      passProps: { id: data.createProject.id },
                      navigatorButtons: {
                        leftButtons: [
                          {
                            title: "Back",
                            id: BACK_BUTTON
                          }
                        ]
      
                      }
                    });
                  }

                  return (
                    <EditForm
                      onSubmit={(projectEditParams: ProjectEditParams) =>
                        this.handleSubmit(
                          projectEditParams,
                          createProjectMutation
                        )
                      }
                      genres={projectFormData.genres}
                      loading={loading}
                      error={error}
                      navigator={this.props.navigator}
                    />
                  );
                }}
              </CreateProjectMutation>
            </View>
          );
        }}
      </ProjectFormQuery>
    );
  }
}

export default ProjectNewScreen;
