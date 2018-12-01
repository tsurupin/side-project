import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import reactNativeActionsheet from 'react-native-actionsheet';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { ProjectDetailsBox } from '../../../components/Discovery/ProjectDetailsScreen';
import {
  BACK_BUTTON,
  CLOSE_BUTTON,
  PROJECT_ACTION_SHEET_BUTTON,
  SUBMIT_BUTTON,
} from '../../../constants/buttons';
import {
  PROJECT_EDIT_SCREEN,
  USER_DETAILS_SCREEN,
} from '../../../constants/screens';
import { WithdrawProjectLikeMutation } from '../../../mutations/projectLikes';
import { ProjectDetailsQuery } from '../../../queries/projects';
import styles from './styles';

interface Props {
  id: string;
  navigator: any;
}

interface State {}
// add like button for newcomer

const CANCEL_INDEX = 0;
const WITHDRAW_PROJECT_LIKE_INDEX = 1;
// handle options dynamically
const ACTION_SHEET_OPTIONS = ['Cancel', 'Leave project'];

class LikedProjectDetailsScreen extends React.Component<Props, State> {
  public refs = {
    actionSheet: ActionSheet,
  };

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

          const { project } = data;

          return (
            <WithdrawProjectLikeMutation>
              {({ withdraProjectLikeMutation, data, loading, error }) => {
                if (loading) { return <LoadingIndicator />; }
                if (error) { return <ErrorMessage {...error} />; }
                if (data) {
                  this.props.navigator.pop();
                  return <View />;
                }

                return (
                  <View>
                    <ProjectDetailsBox
                      project={project}
                      liked={true}
                      onPressUser={this.handleUserPress}
                    />
                    <ActionSheet
                      ref={(o) => (this.ActionSheet = o)}
                      title={'Title'}
                      options={ACTION_SHEET_OPTIONS}
                      cancelButtonIndex={CANCEL_INDEX}
                      destructiveButtonIndex={CANCEL_INDEX}
                      onPress={(index) =>
                        this.handlePressActionSheet(
                          index,
                          withdraProjectLikeMutation,
                        )
                      }
                    />
                    ;
                  </View>
                );
              }}
            </WithdrawProjectLikeMutation>

          );
        }}
      </ProjectDetailsQuery>
    );
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') { return; }

    console.log(e);
    switch (e.id) {
      case PROJECT_ACTION_SHEET_BUTTON:
        this.ActionSheet.show();
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  }

  private handlePressActionSheet = (
    index: number,
    withdrawProjectLikeMutation: any,
  ) => {
    const { id } = this.props;
    switch (index) {
      case WITHDRAW_PROJECT_LIKE_INDEX:
        withdrawProjectLikeMutation({ variables: { projectId: id } });
        break;
    }
  }

  private handleUserPress = (userId: string) => {
    this.props.navigator.push({
      screen: USER_DETAILS_SCREEN,
      passProps: {
        id: userId,
      },
    });
  }
}

export default LikedProjectDetailsScreen;
