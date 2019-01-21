import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { View, ScrollView, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { LoadingIndicator } from '../../../components/Common';
import { EditForm } from '../../../components/Project/Common';
import { ProjectEditFormQuery } from '../../../queries/projects';
import { ProjectDetails, ProjectEditParams, Genre, MinimumOutput, ProjectPhoto } from '../../../interfaces';

import { EditProjectMutation } from '../../../mutations/projects';
import { CLOSE_ICON } from '../../../constants/icons';
import { CLOSE_BUTTON, SUBMIT_BUTTON } from '../../../constants/buttons';
import IconLoader from '../../../utilities/IconLoader';
import styles from './styles';
import { PHOTOS_EDIT_SCREEN } from '../../../constants/screens';
import { buildDefaultNavigationStack } from '../../../utilities/navigationStackBuilder';

type Props = {
  id: string;
  navigator: any;
  componentId: string;
};

type DefaultProps = {
  genres: Genre[];
};

type EditProjectOutput = {
  editProjectMutation: (input: { variables: ProjectEditParams }) => void;
  data: any;
} & MinimumOutput;

type ProjectEditFormOutput = {
  data: {
    projectForm: DefaultProps;
    project: ProjectDetails;
  };
} & MinimumOutput;

class ProjectEditScreen extends React.Component<Props> {
  private form: any;
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case SUBMIT_BUTTON:
        this.form.handleSubmit();
        break;
      case CLOSE_BUTTON:
        Navigation.dismissModal(this.props.componentId);
        break;
    }
  };

  private handleSubmit = (
    variables: Partial<ProjectEditParams>,
    editProjectMutation: (input: { variables: ProjectEditParams }) => void
  ) => {
    editProjectMutation({ variables: { id: this.props.id, ...variables } });
  };

  private handlePressPhoto = (id: string, photos: ProjectPhoto[]) => {
    Navigation.showModal(
      buildDefaultNavigationStack({
        screenName: PHOTOS_EDIT_SCREEN,
        props: {
          id,
          photos,
          photoType: 'Project'
        },
        title: 'Edit Photos',
        leftButton: {
          icon: IconLoader.getIcon(CLOSE_ICON),
          id: CLOSE_BUTTON
        },
        rightButton: {
          text: 'Done',
          enabled: true,
          id: CLOSE_BUTTON
        }
      })
    );
  };

  private renderMainPhoto = (project: ProjectDetails) => {
    const { id, photos } = project;
    return (
      <View style={styles.avatarContainer}>
        <Avatar
          key={id}
          size="xlarge"
          rounded
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
          }}
          onPress={() => this.handlePressPhoto(id, photos)}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  private renderEditForm = (project: ProjectDetails, defaultProps: DefaultProps) => {
    const { genres } = defaultProps;
    return (
      <EditProjectMutation>
        {({ editProjectMutation, loading, error, data }: EditProjectOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
          }
          if (data) {
            Navigation.dismissModal(this.props.componentId);
            return <View />;
          }
          return (
            <EditForm
              project={project}
              onSubmit={(projectEditParams: Partial<ProjectEditParams>) =>
                this.handleSubmit(projectEditParams, editProjectMutation)
              }
              loading={loading}
              genres={genres}
              error={error}
              ref={(instance) => {
                this.form = instance;
              }}
            />
          );
        }}
      </EditProjectMutation>
    );
  };

  render() {
    const { id } = this.props;
    return (
      <ProjectEditFormQuery variables={{ id }}>
        {({ data, loading, error }: ProjectEditFormOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
          }
          const defaultProps: DefaultProps = data.projectForm;

          const project: ProjectDetails = data.project;
          return (
            <View style={styles.container}>
              <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false}>
                {this.renderMainPhoto(project)}
                {this.renderEditForm(project, defaultProps)}
              </ScrollView>
            </View>
          );
        }}
      </ProjectEditFormQuery>
    );
  }
}

export default ProjectEditScreen;
