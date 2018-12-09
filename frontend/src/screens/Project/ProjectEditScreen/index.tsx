import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { EditForm } from '../../../components/Project/Common';
import { ProjectEditFormQuery } from '../../../queries/projects';
import { ProjectDetails, ProjectEditParams, Genre, MinimumOutput } from '../../../interfaces';

import { EditProjectMutation } from '../../../mutations/projects';
import { CLOSE_ICON } from '../../../constants/icons';
import { CLOSE_BUTTON } from '../../../constants/buttons';
import IconLoader from '../../../utilities/IconLoader';
import styles from './styles';
import { PHOTOS_EDIT_SCREEN } from '../../../constants/screens';

type Props = {
  id: string;
  navigator: any;
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
  constructor(props: Props) {
    super(props);
  }

  private handleSubmit = (
    variables: Partial<ProjectEditParams>,
    editProjectMutation: (input: { variables: ProjectEditParams }) => void
  ) => {
    editProjectMutation({ variables: { id: this.props.id, ...variables } });
  };

  private handlePressPhoto = (id: string, photos: any[]) => {
    this.props.navigator.showModal({
      screen: PHOTOS_EDIT_SCREEN,
      title: 'Edit Photos',
      passProps: {
        id,
        photos,
        photoType: 'Project'
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'Close',
            id: CLOSE_BUTTON
          }
        ],
        rightButtons: [
          {
            title: 'Done',
            id: CLOSE_BUTTON
          }
        ]
      }
    });
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
          if (error) return <ErrorMessage {...error} />;
          if (data) {
            this.props.navigator.dismissModal();
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
      <ProjectEditFormQuery variables={{ id }}>
        {({ data, loading, error }: ProjectEditFormOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

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
