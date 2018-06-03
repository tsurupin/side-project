import * as React from "react";
import { View } from "react-native";
import { UserDetails, UserEditParams } from "../../../../interfaces";
import { Input } from "react-native-elements";
import {
  SUBMIT_USER_EDIT_BUTTON,
  CANCEL_USER_EDIT_BUTTON
} from "../../../../constants/buttons";

import styles from "./styles";

type Props = {
  user: UserDetails;
  navigator: any;
  loading: boolean;
  error: any;
  onSubmit: (userEditParams: UserEditParams) => void;
};

class EditForm extends React.Component<Props, UserEditParams> {
  static defaultProps = {
    loading: false
  };

  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      displayName: user.displayName,
      introduction: user.introduction,
      occupationTypeId: user.occupationType ? user.occupationType.id : undefined,
      genreId: user.genre ? user.genre.id : undefined,
      skillIds: user.skills.map(skill => skill.id),
      companyName: user.companyName,
      schoolName: user.schoolName
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = e => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case SUBMIT_USER_EDIT_BUTTON:
        this.props.onSubmit(this.state);
      case CANCEL_USER_EDIT_BUTTON:
        this.props.navigator.pop({
          animated: true
        });
    }
  };

  render() {
    const { displayName, occupation } = this.state;

    return (
      <View>
        <Input
          placeholder="Display Name"
          containerStyle={styles.inputContainer}
          value={displayName}
          onChangeText={e => this.setState({displayName: e})}
        />

        <Input
          placeholder="Display Name"
          containerStyle={styles.inputContainer}
          value={occupation}
          onChangeText={e => this.setState({occupation: e})}
        />
      </View>
    );
  }
}

export default EditForm;
