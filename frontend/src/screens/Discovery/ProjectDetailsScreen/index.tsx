import * as React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { buildDefaultNavigationComponent } from '../../../utilities/navigationStackBuilder';
import { ProjectDetailsQuery } from '../../../queries/projects';
import { BACK_BUTTON } from '../../../constants/buttons';
import { BACK_ICON } from '../../../constants/icons';
import { LikeProjectMutation } from '../../../mutations/projectLikes';
import { LIKED_PROJECT_DETAILS_SCREEN, USER_DETAILS_SCREEN, PROJECT_DETAILS_SCREEN } from '../../../constants/screens';
import { ProjectDetailsBox } from '../../../components/Discovery/ProjectDetailsScreen';
import { ProjectDetails, GraphQLErrorMessage, LikeProjectParams } from '../../../interfaces';
import { LoadingIndicator, ErrorMessage } from '../../../components/Common';
import IconLoader from '../../../utilities/IconLoader';
type Props = {
  id: string;
  navigator: any;
};

type ProjectDetailOutput = {
  data: { project: ProjectDetails };
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

    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case BACK_BUTTON:
        Navigation.pop(PROJECT_DETAILS_SCREEN);
    }
  };

  private handlePress = (likeProjectMutation: (input: { variables: LikeProjectParams }) => void) => {
    likeProjectMutation({ variables: { projectId: this.props.id } });
  };

  private handleUserPress = (userId: string) => {
    Navigation.push(
      USER_DETAILS_SCREEN,
      buildDefaultNavigationComponent({
        screenName: USER_DETAILS_SCREEN,
        props: {
          id: userId
        },
        leftButton: {
          icon: IconLoader.getIcon(BACK_ICON),
          id: BACK_BUTTON
        }
      })
    );
  };

  render() {
    const { id } = this.props;
    return (
      <ProjectDetailsQuery variables={{ id }}>
        {({ data, loading, error }: ProjectDetailOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const project: ProjectDetails = data.project;

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
