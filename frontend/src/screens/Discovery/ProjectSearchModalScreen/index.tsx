import * as React from "react";

import { SKILL_SEARCH_MODAL_SCREEN, CITY_SEARCH_MODAL_SCREEN } from "../../../constants/screens";

import { View, TouchableOpacity, Text } from "react-native";
import { SUBMIT_BUTTON, CANCEL_BUTTON} from "../../../constants/buttons";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Right,
  Body,
  Left,
  Picker,
  Form
} from "native-base";

import {
  Skill,
  Genre,
  ProjectSearchParams
} from "../../../interfaces";
import styles from "./styles";

type Props = {
  navigator: any;
  genreId: string;
  cityId: string;
  zipCode: string;
  skillIds: string[];
  skills: Skill[];
  genres: Genre[];
  client: any;
  onSubmit: (searchParams: ProjectSearchParams) => void;
};

type State = {
  genreId: string;
  cityId: string | null;
  skillIds: string[];
  skills: Skill[];
};

class ProjectSearchFormScreen extends React.Component<Props, State> {
  static defaultProps = {
    genreId: 1,
    skillIds: [],
    genres: [
      {
        name: "Education",
        id: 1
      },
      {
        name: "Finance",
        id: 2
      }
    ],
   
    skills: []
  };

  constructor(props) {
    super(props);

    this.state = {
      genreId: props.genreId,
      cityId: props.cityId,
      zipCode: props.zipCode,
      skillIds: props.skillIds,
      skills: props.skills
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }

  protected handleNavigationEvent = e => {
    if (e.type !== "NavBarButtonPress") {
      return;
    }
    switch (e.id) {
      case SUBMIT_BUTTON:
        this.props.onSubmit({
          genreId: this.state.genreId,
          cityId: this.state.cityId,
          skillIds: this.state.skills.map(skill => skill.id)
        });
        this.props.navigator.dismissModal();
        break;
      case CANCEL_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  protected handleSkillSearchShowModal = () => {
    this.props.navigator.showModal({
      screen: SKILL_SEARCH_MODAL_SCREEN,
      title: "Skill Search",
      animationType: "slide-up",
      passProps: { onPressSkill: this.handleAddSkill }
    });
  };



  protected handleCitySearchShowModal = () => {
    this.props.navigator.showModal({
      screen: CITY_SEARCH_MODAL_SCREEN,
      title: "City Search",
      animationType: "slide-up",
      passProps: { onPress: this.handleAddCity }
    });
  };

  protected handleValueChange = (
    key: string,
    value: string | number | boolean
  ) => {
    let changeAttr = {};
    changeAttr[key] = value;
    this.setState(changeAttr);
  };

  private handleAddCity = (cityId: string) => {
    this.setState({cityId});
  }

  protected handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  protected handleDeleteSkill = (id: number) => {
    const skills = this.state.skills.filter(skill => skill.id !== id);
    this.setState({ skills });
  };

  private renderSkillList = () => {
    return (
      <Content>
        {this.state.skills.map(skill => {
          return (
            <Button
              key={skill.id}
              rounded
              onPress={() => this.handleDeleteSkill(skill.id)}
            >
              <Text>{skill.name}</Text>
            </Button>
          );
        })}
      </Content>
    );
  };

  render() {
    const {
      genreId,
      zipCode,
      cityId
    } = this.state;

    return (
      <Container>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              placeholder="Select person's type"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={styles.pickerContainer}
              selectedValue={genreId}
              onValueChange={value => {
                this.handleValueChange("genreId", value);
              }}
            >
             {this.props.genres.map(genre => {
                return (
                  <Picker.Item
                    key={genre.id}
                    label={genre.name}
                    value={genre.id}
                  />
                );
              })}
            </Picker>
            
            <View style={styles.buttonFormBox}>
              <Text style={styles.textLabel}>Skill</Text>
              <Button
                iconLeft
                primary
                onPress={this.handleSkillSearchShowModal}
              >
                <Icon name="beer" />
              </Button>
              {this.renderSkillList()}
            </View>
            <View style={styles.buttonFormBox}>
              <Text style={styles.textLabel}>Skill</Text>
              <Button
                iconLeft
                primary
                onPress={this.handleCitySearchShowModal}
              >
                <Icon name="beer" />
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default ProjectSearchFormScreen;
