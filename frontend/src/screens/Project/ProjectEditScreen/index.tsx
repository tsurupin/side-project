import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { EditForm } from '../../../components/Project/Common';
import { Genre, ProjectDetails, ProjectEditParams } from '../../../interfaces';
import {
  ProjectEditFormQuery,
} from '../../../queries/projects';

import { CLOSE_BUTTON } from '../../../constants/buttons';
import { CLOSE_ICON } from '../../../constants/icons';
import { PHOTOS_EDIT_SCREEN } from '../../../constants/screens';
import { EditProjectMutation } from '../../../mutations/projects';
import iconLoader from '../../../utilities/iconLoader';
import styles from './styles';

interface Props {
  id: string;
  navigator: any;
}

interface DefaultProps {
  genres: Genre[];
}

class ProjectEditScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { id } = this.props;
    return (
      <ProjectEditFormQuery variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) { return <LoadingIndicator />; }
          if (error) { return <ErrorMessage {...error} />; }

          const defaultProps = data.projectForm;

          const project: ProjectDetails = data.project;
          return (
            <View style={styles.container}>
              <ScrollView
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
              >
                {this.renderMainPhoto(project)}
                {this.renderEditForm(project, defaultProps)}
              </ScrollView>
            </View>
          );

        }}
      </ProjectEditFormQuery>
    );
  }

  private handleSubmit = (
    variables: ProjectEditParams,
    editProjectMutation: any,
  ) => {
    editProjectMutation({ variables: { id: this.props.id, ...variables } });
  }

  private handlePressPhoto = (id: string, photos: any[]) => {
    this.props.navigator.showModal({
      screen: PHOTOS_EDIT_SCREEN,
      title: 'Edit Photos',
      passProps: {
        id,
        photos,
        photoType: 'Project',
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'Close',
            id: CLOSE_BUTTON,
          },
        ],
        rightButtons: [
          {
            title: 'Done',
            id: CLOSE_BUTTON,
          },
        ],
      },
    });
  }

  private renderMainPhoto = (project: ProjectDetails) => {
    const { id, photos } = project;
    return (
      <View style={styles.avatarContainer}>
        <Avatar
          key={id}
          size="xlarge"
          rounded
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
          onPress={() => this.handlePressPhoto(id, photos)}
          activeOpacity={0.7}
        />
      </View>
    );
  }

  private renderEditForm = (project: ProjectDetails, defaultProps: DefaultProps) => {
    const { genres } = defaultProps;
    return (
      <EditProjectMutation>
        {({ editProjectMutation, loading, error, data }) => {
          if (loading) { return <LoadingIndicator />; }
          if (error) { return <ErrorMessage {...error} />; }
          if (data) {
            console.log(data, 'aa');
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
  }
}

export default ProjectEditScreen;
