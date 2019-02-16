import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { View, ScrollView, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import { LoadingIndicator } from '../../../components/Common';
import { EditForm } from '../../../components/Project/Common';
import { ProjectEditFormQuery } from '../../../queries/projects';
import {
  ProjectDetails,
  ProjectChangeStatusParams,
  ProjectEditParams,
  Genre,
  MinimumOutput,
  ProjectPhoto
} from '../../../interfaces';

import { EditProjectMutation, ChangeProjectStatusMutation } from '../../../mutations/projects';
import { CLOSE_ICON } from '../../../constants/icons';
import { CLOSE_BUTTON, SUBMIT_BUTTON } from '../../../constants/buttons';
import IconLoader from '../../../utilities/IconLoader';
import styles from './styles';
import { PHOTOS_EDIT_SCREEN } from '../../../constants/screens';
import { buildDefaultNavigationStack } from '../../../utilities/navigationStackBuilder';

const CANCEL_INDEX = 0;
const ACTION_TO_STATUSES = {
  Publish: 'completed',
  Unpublish: 'editing'
};

type Props = {
  id: string;
  status: string;
  publisheable: boolean;
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

type ChangeProjectStatusOutput = {
  changeProjectStatusMutation: (input: { variables: ProjectChangeStatusParams }) => void;
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
  public refs = {
    actionSheet: ActionSheet
  };

  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case SUBMIT_BUTTON:
        this.ActionSheet.show();
        // how to show submit doesn't change any data
        // ow to limit per status
        break;
      case CLOSE_BUTTON:
        Navigation.dismissModal(this.props.componentId);
        break;
    }
  };

  private handlePressActionSheet = (
    action: string,
    changeProjectStatusMutation: (input: { variables: ProjectChangeStatusParams }) => void
  ) => {
    if (action === 'Change') {
      this.form.handleSubmit();
    } else if (action !== 'Cancel') {
      const { id } = this.props;
      changeProjectStatusMutation({ variables: { id, status: ACTION_TO_STATUSES[action] } });
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
      <ChangeProjectStatusMutation>
        {({ changeProjectStatusMutation, loading, error, data }: ChangeProjectStatusOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
          }
          if (data) {
            Navigation.dismissModal(this.props.componentId);
            return <View />;
          }
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
                let options = ['Change'];
                if (project.status === 'COMPLETED') {
                  options = [...options, 'Unpublish'];
                } else if (project.title) {
                  options = [...options, 'Publish'];
                }
                options = [...options, 'Cancel'];
                console.log('pro', project);
                return (
                  <View>
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
                    <ActionSheet
                      ref={(o: any) => (this.ActionSheet = o)}
                      title={'Edit'}
                      options={options}
                      cancelButtonIndex={options.length - 1}
                      destructiveButtonIndex={options.length - 2}
                      onPress={(index: number) =>
                        this.handlePressActionSheet(options[index], changeProjectStatusMutation)
                      }
                    />
                  </View>
                );
              }}
            </EditProjectMutation>
          );
        }}
      </ChangeProjectStatusMutation>
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
            return <View />;
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
