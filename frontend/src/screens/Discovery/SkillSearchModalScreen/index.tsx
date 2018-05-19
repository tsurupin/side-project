import * as React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ListItem, Input } from "react-native-elements";
import { USER_SEARCH_MODAL_SCREEN } from "../../../constants/screens";
import {
  SkillInput,
  SkillList
} from "../../../components/Discovery/SkillSearchModalScreen";
import { SkillsQuery } from "../../../queries/skills";
import { Skill } from "../../../interfaces";
import styles from "./styles";

type Props = {
  navigator?: any;
  skills: Skill[];
  client: any;
  onPressSkill: (skill: Skill) => void;
};

type State = {
  loading: boolean;
  name: string;
  errorMessage: string;
};

class SkillSearchModalScreen extends React.Component<Props, State> {
  state = {
    loading: false,
    name: "",
    errorMessage: ""
  };

  static defaultProps = {
    skills: []
  };

  constructor(props) {
    super(props);
  }

  protected onPressSkill = (skill: Skill) => {
    this.props.onPressSkill(skill);
    this.props.navigator.dismissModal();
  };

  private handleChangeText = (name: string) => {
    this.setState({ name });
  };

  private handleDismissModal = () => {
    this.props.navigator.dismissModal();
  };

  private renderSkillList = () => {
    const { name } = this.state;
    return (
      <SkillsQuery variables={{ name }}>
        {({ data, error, loading }) => {
          if (loading) {
            //return this.setState({loading});
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
            //return this.setState({errorMessage: error});
          }
          return (
            <SkillList skills={data.skills} onPressSkill={this.onPressSkill} />
          );
        }}
      </SkillsQuery>
    );
  };

  private renderTextForm = () => {
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
