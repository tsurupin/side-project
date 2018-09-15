import * as React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-elements";
import { ErrorMessage, LoadingIndicator } from "../../../components/Common";
import { EditForm } from "../../../components/Project/Common";
import {
  ProjectFormQuery,
  ProjectDetailsQuery
} from "../../../queries/projects";
import { ProjectDetails, ProjectEditParams } from "../../../interfaces";

import { EditProjectMutation } from "../../../mutations/projects";

import styles from "./styles";
import { PHOTOS_EDIT_SCREEN } from "../../../constants/screens";

type Props = {
  id: string;
  navigator: any;
};

class ProjectEditScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  private handleSubmit = (
    variables: ProjectEditParams,
    editProjectMutation: any
  ) => {
    editProjectMutation({ variables: { id: this.props.id, ...variables } });
  };

  private handlePressPhoto = (id: string, photos: any[]) => {
    this.props.navigator.showModal({
      screen: PHOTOS_EDIT_SCREEN,
      passProps: {
        id,
        photos
      }
    });
  };

  private renderMainPhoto = (project: ProjectDetails) => {
    const { id, photos } = project;
    return (
      <Avatar
        key={id}
        size="xlarge"
        avatarStyle={styles.avatar}
        rounded
        source={{
          uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
        }}
        onPress={() => this.handlePressPhoto(id, photos)}
        activeOpacity={0.7}
      />
    );
  };

  private renderEditForm = (project: ProjectDetails, defaultProps) => {
    const { genres } = defaultProps;
    return (
      <EditProjectMutation>
        {({ editProjectMutation, loading, error, data }) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;
          if (data) {
            this.props.navigator.dismissModal();
            return <View />;
          }
          return (
            <EditForm
              project={project}
              onSubmit={(projectEditParams: ProjectEditParams) =>
                this.handleSubmit(projectEditParams, editProjectMutation)
              }
              loading={loading}
              genres={genres}
              error={error}
              navigator={this.props.navigator}
            />
          );
        }}
      </EditProjectMutation>
    );
  };

  render() {
    const { id } = this.props;
    return (
      <ProjectFormQuery>
        {({ data, loading, error }) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const defaultProps = data.projectForm;

          return (
            <ProjectDetailsQuery variables={{ id }}>
              {({ data, loading, error }) => {
                if (loading) return <LoadingIndicator />;
                if (error) return <ErrorMessage {...error} />;

                const project: ProjectDetails = data.project;
                return (
                  <View style={styles.container}>
                    {this.renderMainPhoto(project)}
                    {this.renderEditForm(project, defaultProps)}
                  </View>
                );
              }}
            </ProjectDetailsQuery>
          );
        }}
      </ProjectFormQuery>
    );
  }
}

export default ProjectEditScreen;
