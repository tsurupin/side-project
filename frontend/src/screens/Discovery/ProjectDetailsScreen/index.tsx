import * as React from 'react';
import { View } from 'react-native';
import { ProjectDetailsQuery } from '../../../queries/projects';
import { BACK_BUTTON } from '../../../constants/buttons';
import { BACK_ICON } from '../../../constants/icons';

import { LikeProjectMutation } from '../../../mutations/projectLikes';
import { LIKED_PROJECT_DETAILS_SCREEN, USER_DETAILS_SCREEN } from '../../../constants/screens';
import { ProjectDetailsBox } from '../../../components/Discovery/ProjectDetailsScreen';
import { ProjectDetail, GraphQLErrorMessage, LikeProjectParams } from '../../../interfaces';
import { LoadingIndicator, ErrorMessage } from '../../../components/Common';
import IconLoader from '../../../utilities/IconLoader';
type Props = {
  id: string;
  navigator: any;
};

type ProjectDetailOutput = {
  data: { project: ProjectDetail };
  error: GraphQLErrorMessage | undefined;
  loading: boolean;
};

type LikeProjectOutput = {
  data: any;
  likeProjectMutation: (input: { variables: LikeProjectParams }) => void;
  error: GraphQLErrorMessage | undefined;
  loading: boolean;
};

class ProjectDetailsScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') return;

    switch (e.id) {
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  };

  private handlePress = (likeProjectMutation: (input: { variables: LikeProjectParams }) => void) => {
    likeProjectMutation({ variables: { projectId: this.props.id } });
  };

  private handleUserPress = (userId: string) => {
    this.props.navigator.push({
      screen: USER_DETAILS_SCREEN,
      passProps: {
        id: userId
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(BACK_ICON),
            id: BACK_BUTTON
          }
        ]
      }
    });
  };

  render() {
    const { id } = this.props;
    return (
      <ProjectDetailsQuery variables={{ id }}>
        {({ data, loading, error }: ProjectDetailOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const project: ProjectDetail = data.project;

          return (
            <LikeProjectMutation>
              {({ likeProjectMutation, data, loading, error }: LikeProjectOutput) => {
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
          );
        }}
      </ProjectDetailsQuery>
    );
  }
}

export default ProjectDetailsScreen;
