import * as React from 'react';
import { View, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ProjectDetailsQuery } from '../../../queries/projects';
import ActionSheet from 'react-native-actionsheet';
import { BACK_BUTTON, ACTION_SHEET_BUTTON } from '../../../constants/buttons';
import { ProjectDetailsBox } from '../../../components/Discovery/ProjectDetailsScreen';
import { USER_DETAILS_SCREEN, CHAT_SCREEN } from '../../../constants/screens';
import { WithdrawProjectLikeMutation } from '../../../mutations/projectLikes';
import { LoadingIndicator } from '../../../components/Common';
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
const MOVE_TO_CHAT_INDEX = 0;
const WITHDRAW_PROJECT_LIKE_INDEX = 1;
const CANCEL_INDEX = 2;
// handle options dynamically
const ACTION_SHEET_OPTIONS = ['Move to Project Chat', 'Leave', 'Cancel'];

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
      case ACTION_SHEET_BUTTON:
        this.ActionSheet.show();
        break;
      case BACK_BUTTON:
        Navigation.pop(this.props.componentId);
        break;
    }
  };

  private handlePressActionSheet = (
    index: number,
    chatId: string,
    withdrawProjectLikeMutation: (input: { variables: { projectId: string } }) => void
  ) => {
    console.log('actionsheet', index);
    const { id } = this.props;
    switch (index) {
      case MOVE_TO_CHAT_INDEX:
        Navigation.push(
          this.props.componentId,
          buildDefaultNavigationComponent({
            screenName: CHAT_SCREEN,
            props: {
              id: chatId
            },
            title: name,
            leftButton: {
              icon: IconLoader.getIcon(BACK_ICON),
              id: BACK_BUTTON
            }
          })
        );
        break;
      case WITHDRAW_PROJECT_LIKE_INDEX:
        withdrawProjectLikeMutation({ variables: { projectId: id } });
        break;
    }
  };

  private handlePressUser = (userId: string, name: string) => {
    Navigation.push(
      this.props.componentId,
      buildDefaultNavigationComponent({
        screenName: USER_DETAILS_SCREEN,
        props: {
          id: userId
        },
        title: name,
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
      <ProjectDetailsQuery variables={{ id, withChat: true }}>
        {({ data, loading, error }: ProjectDetailsOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
            return <View />;
          }

          const { project } = data;
          console.log('details', project);

          return (
            <WithdrawProjectLikeMutation>
              {({ withdrawProjectLikeMutation, data, loading, error }: WithdrawProjectLikeOutput) => {
                if (loading) return <LoadingIndicator />;
                if (error) {
                  Alert.alert(error.message);
                  return <View />;
                }
                if (data) {
                  Navigation.popToRoot(this.props.componentId);
                  return <View />;
                }

                return (
                  <View>
                    <ProjectDetailsBox project={project} liked={true} onPressUser={this.handlePressUser} />
                    <ActionSheet
                      ref={(o: any) => (this.ActionSheet = o)}
                      title={''}
                      options={ACTION_SHEET_OPTIONS}
                      cancelButtonIndex={CANCEL_INDEX}
                      destructiveButtonIndex={CANCEL_INDEX - 1}
                      onPress={(index: number) =>
                        this.handlePressActionSheet(index, project.chatId, withdrawProjectLikeMutation)
                      }
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
