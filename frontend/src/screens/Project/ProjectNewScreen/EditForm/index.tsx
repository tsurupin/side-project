import * as React from "react";
import { View, Button, Text } from "react-native";
import { ProjectEditParams, Skill, City, Genre } from "../../../../interfaces";
import { Input } from "react-native-elements";
import { InnerTextInput, InnerSelectInput } from "../../../../components/Commons";
import { BACK_BUTTON, SUBMIT_BUTTON } from "../../../../constants/buttons";
import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN
} from "../../../../constants/screens";

import styles from "./styles";

type Props = {
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

    this.state = {
      title: undefined,
      leadSentence: undefined,
      motivation: undefined,
      requirement: undefined,
      genre: undefined,
      city: undefined,
      skills: []
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private buildProjectEditParams = (): ProjectEditParams => {
    let params = {};
    const stringKeys = ["title", "leadSentence", "motivation", "requirement"];
    const objectKeys = ["genre", "city"];
    const arrayObjectKeys = ["skills"];
    stringKeys.forEach(key => (params[key] = this.state[key]));
    objectKeys.forEach(key => {
      if (this.state[key]) {
        params[key] = this.state[key] ? this.state[key].id : undefined;
      }
    });

    arrayObjectKeys.forEach(key => {
      params[`${key}Ids`] = this.state[key].map(item => item.id);
    });

    return params;
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
    console.log(city)
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
    const { title, leadSentence, city } = this.state;

    return (
      <View style={styles.container}>
        <InnerTextInput
          label="title"
          placeholder="Enter Title"
          value={title}
          onChange={(key: string, value: string) => {
            console.log(key, value); 
            this.setState({title: value})}}
        />

        <Input
          placeholder="Lead Sentence"
          containerStyle={styles.inputContainer}
          value={leadSentence}
          onChangeText={e => this.setState({ leadSentence: e })}
        />
        <InnerSelectInput
          placeholder="Select City"
          value={ city ? city.fullName : ""}
          label="City"
          onPress={() => this.handleCitySearchShowModal()}
        />

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
