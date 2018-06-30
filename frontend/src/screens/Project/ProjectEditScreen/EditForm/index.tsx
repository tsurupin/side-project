import * as React from "react";
import { View, Button, Text } from "react-native";
import {
  ProjectDetails,
  ProjectEditParams,
  Skill,
  City,
  Genre
} from "../../../../interfaces";
import { Input } from "react-native-elements";
import {
  SUBMIT_BUTTON,
  BACK_BUTTON
} from "../../../../constants/buttons";
import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN
} from "../../../../constants/screens";

import styles from "./styles";

type Props = {
  project: ProjectDetails;
  navigator: any;
  loading: boolean;
  error: any;
  onSubmit: (projectEditParams: ProjectEditParams) => void;
};

type State = {
  title: string | undefined;
  leadSentence: string | undefined;
  motivation: string | undefined;
  requirement: string | undefined;
  genre: Genre | undefined;
  city: City | undefined;
  skills: Skill[];
};

class EditForm extends React.Component<Props, State> {
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
      genre: project.genre,
      city: project.city,
      skills: project.skills
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private buildProjectEditParams = (): ProjectEditParams => {
    const { project } = this.props;
    let params = {};

    const stringKeys = ["title", "leadSentence", "motivation", "requirement"];
    const objectKeys = ["genre", "city"];
    const arrayObjectKeys = ["skills"];
    stringKeys.forEach(key => {
      let currentValue = this.state[key];
      if (!currentValue === project[key]) {
        params[key] = currentValue;
      }
    });

    objectKeys.forEach(key => {
      if (this.objectValueChanged(key)) {
        params[key] = this.state[key] ? this.state[key].id : undefined;
      }
    });

    arrayObjectKeys.forEach(key => {
      if (this.arrayObjectValueChanged(key)) {
        params[`${key}Ids`] = this.state[key].map(item => item.id);
      }
    });

    return params;
  };

  private objectValueChanged = (key: string): boolean => {
    const currentValue = this.state[key];
    const previousValue = this.props.project[key];

    if (currentValue && previousValue && currentValue.id === previousValue.id) {
      return false;
    } else if (!currentValue && !previousValue) {
      return false;
    } else {
      return true;
    }
  };

  private arrayObjectValueChanged = (key: string): boolean => {
    const currentObjectIds = this.state[key].map(item => item.id);
    const previousObjectIds = this.props.project[key].map(item => item.id);

    const intersectionCount = new Set(
      [...currentObjectIds].filter(id => previousObjectIds.has(id))
    ).size;
    return previousObjectIds.size !== intersectionCount;
  };

  private handleNavigatorEvent = e => {
    if (e.type !== "NavBarButtonPress") return;
    switch (e.id) {
      case SUBMIT_BUTTON:
        this.props.onSubmit(this.buildProjectEditParams());
        break;
      case BACK_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  private handleUpdateLocation = (
    city: City,
    longitude: number | undefined = undefined,
    latitude: number | undefined = undefined
  ) => {
    this.setState({ city });
  };

  private handleSkillSearchShowModal = () => {
    this.props.navigator.showModal({
      screen: SKILL_SEARCH_MODAL_SCREEN,
      title: "Skill Search",
      animationType: "slide-up",
      passProps: { onPress: this.handleAddSkill }
    });
  };

  private handleCitySearchShowModal = () => {
    this.props.navigator.showModal({
      screen: CITY_SEARCH_MODAL_SCREEN,
      title: "City Search",
      animationType: "slide-up",
      passProps: {
        onPress: this.handleUpdateLocation,
        needLocationSearch: true
      }
    });
  };

  protected handleDeleteSkill = (id: string) => {
    const skills = this.state.skills.filter(skill => skill.id !== id);
    this.setState({ skills });
  };

  private renderSkillList = () => {
    return (
      <View>
        {this.state.skills.map(skill => {
          return (
            <Button
              key={skill.id}
              title={skill.name}
              onPress={() => this.handleDeleteSkill(skill.id)}
            />
          );
        })}
      </View>
    );
  };

  render() {
    const { title, leadSentence } = this.state;

    return (
      <View>
        <Input
          placeholder="Title"
          containerStyle={styles.inputContainer}
          value={title}
          onChangeText={e => this.setState({ title: e })}
        />

        <Input
          placeholder="Lead Sentence"
          containerStyle={styles.inputContainer}
          value={leadSentence}
          onChangeText={e => this.setState({ leadSentence: e })}
        />
        <View style={styles.buttonFormBox}>
          <Text style={styles.textLabel}>City</Text>
          <Button
            title="Search City"
            onPress={() => this.handleCitySearchShowModal()}
          />
        </View>

        <View style={styles.buttonFormBox}>
          <Text style={styles.textLabel}>Skill</Text>
          <Button
            title="Search Skill"
            onPress={() => this.handleSkillSearchShowModal()}
          />
          {this.renderSkillList()}
        </View>
      </View>
    );
  }
}

export default EditForm;
