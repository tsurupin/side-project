import * as React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { USER_SEARCH_MODAL_SCREEN } from "../../../constants/screens";
import {
  SkillInput,
  SkillList
} from "../../../components/Discovery/SkillSearchModalScreen";
import { CANCEL_BUTTON, BACK_BUTTON } from "../../../constants/buttons";
import { SkillsQuery } from "../../../queries/skills";

import { Skill } from "../../../interfaces";
import { getIcon } from "../../../utilities/iconLoader";
import { CLOSE_ICON } from "../../../constants/icons";

import styles from "./styles";

type Props = {
  navigator?: any;
  skills: Skill[];
  onPress: (skill: Skill) => void;
};

type State = {
  loading: boolean;
  name: string;
  errorMessage: string;
};

class SkillSearchModalScreen extends React.Component<Props, State> {
  static defaultProps = {
    skills: []
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: "",
      errorMessage: ""
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }

  private handleNavigationEvent = e => {
    if (e.type !== "NavBarButtonPress") {
      return;
    }
    switch (e.id) {
      case BACK_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private onPressSkill = (skill: Skill) => {
    this.props.onPress(skill);
    this.props.navigator.dismissModal();
  };

  private handleChangeText = (name: string) => {
    this.setState({ name });
  };

  private renderSkillList = () => {
    const { name } = this.state;
    return (
      <SkillsQuery variables={{ name }}>
        {({ data, error, loading }) => {
          if (loading) {
  
            return (
              <View>
                <Text>Loading</Text>
              </View>
            );
          }
          if (error) {
            return (
              <View>
                <Text>{error}</Text>
              </View>
            );
          }
          return (
            <SkillList skills={data.skills} onPressSkill={this.onPressSkill} />
          );
        }}
      </SkillsQuery>
    );
  };

  private renderTextForm = () => {
    const { name } = this.state;
    console.log(name);
    return <SkillInput name={name} onChangeText={this.handleChangeText} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderTextForm()}
        {this.renderSkillList()}
      </View>
    );
  }
}

export default SkillSearchModalScreen;
