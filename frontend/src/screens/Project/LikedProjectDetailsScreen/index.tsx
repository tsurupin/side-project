import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ProjectDetailsQuery } from "../../../queries/projects";
import ActionSheet from "react-native-actionsheet";
import {
  BACK_BUTTON,
  PROJECT_ACTION_SHEET_BUTTON,
  CLOSE_BUTTON,
  SUBMIT_BUTTON
} from "../../../constants/buttons";
import styles from "./styles";
import { PROJECT_EDIT_SCREEN } from "../../../constants/screens";
import { WithdrawProjectLikeMutation } from "../../../mutations/projectLikes";

type Props = {
  id: string;
  navigator: any;
};

type State = {};
// add like button for newcomer

const CANCEL_INDEX = 0;
const PROJECT_EDIT_INDEX = 1;
const WITHDRAW_PROJECT_LIKE_INDEX = 2;
// handle options dynamically
const ACTION_SHEET_OPTIONS = ["Cancel", "Edit group", "Leave project"];

class LikedProjectDetailsScreen extends React.Component<Props, State> {
  public refs = {
    actionSheet: ActionSheet
  };

  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = e => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case PROJECT_ACTION_SHEET_BUTTON:
        this.ActionSheet.show();
      case BACK_BUTTON:
       this.props.navigator.pop();  
    }
  };

  handlePressActionSheet = (
    index: number,
    withdrawProjectLikeMutation: any
  ) => {
    const { id } = this.props;
    console.log("index is", index)
    switch (index) {
      case PROJECT_EDIT_INDEX:
        this.props.navigator.showModal({
          screen: PROJECT_EDIT_SCREEN,
          passProps: { id },
          navigatorButtons: {
            leftButtons: [
              {
                //icon: sources[1],
                title: "Close",
                id: CLOSE_BUTTON
              }
            ],
            rightButtons: [
              {
                title: "Submit",
                id: SUBMIT_BUTTON
              }
            ]
          }
        });
        break;
      case WITHDRAW_PROJECT_LIKE_INDEX:
        withdrawProjectLikeMutation({ variables: { projectId: id } });
        break;
    }
  };

  render() {
    const { id } = this.props;
    return (
      <ProjectDetailsQuery variables={{ id }}>
        {({ data, loading, error }) => {
          console.log(error);
          if (loading)
            return (
              <View>
                <Text> Text</Text>
              </View>
            );
          if (error)
            return (
              <View>
                <Text> Error</Text>
              </View>
            );

          const { project } = data;
          console.log(data)
          return (
            <View>
              <Text>{project.title}</Text>
              <WithdrawProjectLikeMutation>
                {({ withdraProjectLikeMutation, data, loading, error }) => {
          
                  if (data) {
                    // Alert
                    this.props.navigator.pop();
                    return <View></View>
                  }
                  
                  return(
                    <View>

                    <ActionSheet
                      ref={o => this.ActionSheet = o}
                      title={"Title"}
                      options={ACTION_SHEET_OPTIONS}
                      cancelButtonIndex={CANCEL_INDEX}
                      destructiveButtonIndex={CANCEL_INDEX}
                      onPress={index => this.handlePressActionSheet(index, withdraProjectLikeMutation)}
                    />;
                    </View>
                  )
                }}
              </WithdrawProjectLikeMutation>
            </View>
          );
        }}
      </ProjectDetailsQuery>
    );
  }
}

export default LikedProjectDetailsScreen;
