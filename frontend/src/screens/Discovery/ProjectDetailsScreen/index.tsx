import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { BACK_BUTTON } from '../../../constants/buttons';
import { BACK_ICON } from '../../../constants/icons';
import { ProjectDetailsQuery } from '../../../queries/projects';

import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { ProjectDetailsBox } from '../../../components/Discovery/ProjectDetailsScreen';
import {
  LIKED_PROJECT_DETAILS_SCREEN,
  USER_DETAILS_SCREEN,
} from '../../../constants/screens';
import { ProjectDetails } from '../../../interfaces';
import { LikeProjectMutation } from '../../../mutations/projectLikes';
import iconLoader from '../../../utilities/iconLoader';
import styles from './styles';
interface Props {
  id: string;
  navigator: any;
}

class ProjectDetailsScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  public render() {
    const { id } = this.props;
    return (
      <ProjectDetailsQuery variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) { return <LoadingIndicator />; }
          if (error) { return <ErrorMessage {...error} />; }

          const project: ProjectDetails = data.project;

          return (
            <LikeProjectMutation>
              {({ likeProjectMutation, data, loading, error }) => {
                if (loading) { return <LoadingIndicator />; }
                if (error) { return <ErrorMessage {...error} />; }
                if (data) {
                  this.props.navigator.push({
                    screen: LIKED_PROJECT_DETAILS_SCREEN,
                    passProps: { id },
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

          );
        }}
      </ProjectDetailsQuery>
    );
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') { return; }

    switch (e.id) {
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  }

  private handlePress = (likeProjectMutation) => {
    likeProjectMutation({ variables: { projectId: this.props.id } });
  }

  private handleUserPress = (userId: string) => {
    this.props.navigator.push({
      screen: USER_DETAILS_SCREEN,
      passProps: {
        id: userId,
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon:IconLoader.getIcon(BACK_ICON),
            id: BACK_BUTTON,
          },
        ],
      },
    });
  }
}

export default ProjectDetailsScreen;
