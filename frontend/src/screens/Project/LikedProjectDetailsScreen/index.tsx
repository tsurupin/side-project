import * as React from 'react';
import { View, BackHandler } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ProjectDetailsQuery } from '../../../queries/projects';
import ActionSheet from 'react-native-actionsheet';
import { BACK_BUTTON, PROJECT_ACTION_SHEET_BUTTON } from '../../../constants/buttons';
import { ProjectDetailsBox } from '../../../components/Discovery/ProjectDetailsScreen';
import { USER_DETAILS_SCREEN } from '../../../constants/screens';
import { WithdrawProjectLikeMutation } from '../../../mutations/projectLikes';
import { LoadingIndicator, ErrorMessage } from '../../../components/Common';
import { MinimumOutput, ProjectDetails } from '../../../interfaces';
import { buildDefaultNavigationComponent } from '../../../utilities/navigationStackBuilder';
import IconLoader from '../../../utilities/IconLoader';
import { BACK_ICON } from '../../../constants/icons';

type Props = {
  id: string;
  navigator: any;
  componentId: string;
};

// add like button for newcomer
const CANCEL_INDEX = 0;
const WITHDRAW_PROJECT_LIKE_INDEX = 1;
// handle options dynamically
const ACTION_SHEET_OPTIONS = ['Cancel', 'Leave project'];

type ProjectDetailsOutput = {
  data: { project: ProjectDetails };
} & MinimumOutput;

type WithdrawProjectLikeOutput = {
  data: any;
  withdrawProjectLikeMutation: (input: { variables: { projectId: string } }) => void;
} & MinimumOutput;

class LikedProjectDetailsScreen extends React.Component<Props> {
  public refs = {
    actionSheet: ActionSheet
  };

  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case PROJECT_ACTION_SHEET_BUTTON:
        this.ActionSheet.show();
        break;
      case BACK_BUTTON:
        Navigation.pop(this.props.componentId);
        break;
    }
  };

  private handlePressActionSheet = (
    index: number,
    withdrawProjectLikeMutation: (input: { variables: { projectId: string } }) => void
  ) => {
    const { id } = this.props;
    switch (index) {
      case WITHDRAW_PROJECT_LIKE_INDEX:
        withdrawProjectLikeMutation({ variables: { projectId: id } });
        break;
    }
  };

  private handleUserPress = (userId: string) => {
    Navigation.push(
      this.props.componentId,
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
        {({ data, loading, error }: ProjectDetailsOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const { project } = data;

          return (
            <WithdrawProjectLikeMutation>
              {({ withdrawProjectLikeMutation, data, loading, error }: WithdrawProjectLikeOutput) => {
                if (loading) return <LoadingIndicator />;
                if (error) return <ErrorMessage {...error} />;
                if (data) {
                  Navigation.pop(this.props.componentId);
                  return <View />;
                }

                return (
                  <View>
                    <ProjectDetailsBox project={project} liked={true} onPressUser={this.handleUserPress} />
                    <ActionSheet
                      ref={(o: any) => (this.ActionSheet = o)}
                      title={'Title'}
                      options={ACTION_SHEET_OPTIONS}
                      cancelButtonIndex={CANCEL_INDEX}
                      destructiveButtonIndex={CANCEL_INDEX}
                      onPress={(index: number) => this.handlePressActionSheet(index, withdrawProjectLikeMutation)}
                    />
                  </View>
                );
              }}
            </WithdrawProjectLikeMutation>
          );
        }}
      </ProjectDetailsQuery>
    );
  }
}

export default LikedProjectDetailsScreen;
