import * as React from "react";
import { View } from "react-native";
import { ProjectDetails, ProjectEditParams } from "../../../../interfaces";
import { Input } from "react-native-elements";
import {
  SUBMIT_PROJECT_EDIT_BUTTON,
  CANCEL_PROJECT_EDIT_BUTTON
} from "../../../../constants/buttons";

import styles from "./styles";

type Props = {
  project: ProjectDetails;
  navigator: any;
  loading: boolean;
  error: any;
  onSubmit: (projectEditParams: ProjectEditParams) => void;
};

class EditForm extends React.Component<Props, ProjectEditParams> {
  static defaultProps = {
    loading: false
  };

  constructor(props) {
    super(props);
    const { project } = this.props;
    this.state = {
      title: project.title,
      leadSentence: project.leadSentence,
      motivation: project.motivation,
      requirement: project.requirement,
      genreId: project.genre.id,
      skillIds: project.skills.map(skill => skill.id)
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = e => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case SUBMIT_PROJECT_EDIT_BUTTON:
        this.props.onSubmit(this.state);
      case CANCEL_PROJECT_EDIT_BUTTON:
        this.props.navigator.pop({
          animated: true
        });
    }
  };

  render() {
    const { title, leadSentence } = this.state;

    return (
      <View>
        <Input
          placeholder="Title"
          containerStyle={styles.inputContainer}
          value={title}
          onChangeText={e => this.setState({title: e})}
        />

        <Input
          placeholder="Lead Sentence"
          containerStyle={styles.inputContainer}
          value={leadSentence}
          onChangeText={e => this.setState({leadSentence: e})}
        />
      </View>
    );
  }
}

export default EditForm;
