import * as React from "react";

import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  PICKER_SCREEN
} from "../../../constants/screens";

import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { SelectBox } from "../../../components/Commons";
import { APPLY_BUTTON, CLOSE_BUTTON } from "../../../constants/buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Skill, City, Genre, ProjectSearchParams } from "../../../interfaces";
import { getIcon } from "../../../utilities/iconLoader";
import { CLOSE_ICON } from "../../../constants/icons";

import styles from "./styles";

type Props = {
  navigator: any;
  genreId: string;
  cityId: string;
  zipCode: string;
  skillIds: string[];
  skills: Skill[];
  genres: Genre[];
  onSubmit: (searchParams: ProjectSearchParams) => void;
};

type State = {
  genreId: string;
  city: City;
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
    city: undefined,

    skills: []
  };

  constructor(props) {
    super(props);

    this.state = {
      genreId: props.genreId,
      city: props.city,
      skillIds: props.skillIds,
      skills: props.skills
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }

  private handleNavigationEvent = (e) => {
    if (e.type !== "NavBarButtonPress") {
      return;
    }
    switch (e.id) {
      case APPLY_BUTTON:
        this.props.onSubmit({
          genreId: this.state.genreId,
          cityId: this.state.city ? this.state.city.id : undefined,
          skillIds: this.state.skills.map((skill) => skill.id)
        });
        this.props.navigator.dismissModal();
        break;
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private handlePressShowModal = (
    items: any[],
    keyName: string,
    selectedValue: string | number | undefined
  ) => {
    this.props.navigator.showModal({
      screen: PICKER_SCREEN,
      passProps: {
        items,
        keyName,
        selectedValue,
        onPress: this.handleChangeValue
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: getIcon(CLOSE_ICON),
            title: "CLOSE",
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  protected handleSkillSearchShowModal = () => {
    this.props.navigator.showModal({
      screen: SKILL_SEARCH_MODAL_SCREEN,
      title: "Skill Search",
      animationType: "slide-up",
      passProps: { onPress: this.handleAddSkill },
      navigatorButtons: {
        leftButtons: [
          {
            title: "Close",
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  protected handleCitySearchShowModal = () => {
    this.props.navigator.showModal({
      screen: CITY_SEARCH_MODAL_SCREEN,
      title: "City Search",
      animationType: "slide-up",
      passProps: { onPress: this.handleAddCity },
      navigatorButtons: {
        leftButtons: [
          {
            title: "Close",
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  protected handleChangeValue = (key: string, value: string) => {
    let changeAttr = {};
    changeAttr[key] = value;
    this.setState(changeAttr);
  };

  private handleAddCity = (city: City) => {
    this.setState({ city });
  };

  protected handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  protected handleDeleteSkill = (id: string) => {
    const skills = this.state.skills.filter((skill) => skill.id !== id);
    this.setState({ skills });
  };

  private renderSkillList = () => {
    return <FlatList data={this.state.skills} renderItem={this.renderSkill} />;
  };

  private renderSkill = (data) => {
    const skill: Skill = data.item;
    return (
      <ListItem
        key={skill.id}
        title={skill.name}
        bottomDivider
        rightIcon={this.renderSkillRemoveIcon(skill.id)}
      />
    );
  };

  private renderSkillAddIcon = () => {
    return (
      <MaterialCommunityIcons
        name="plus"
        onPress={() => this.handleSkillSearchShowModal()}
      />
    );
  };

  private renderSkillRemoveIcon = (skillId: string) => {
    return (
      <MaterialCommunityIcons
        name="minus-circle"
        onPress={() => this.handleDeleteSkill(skillId)}
      />
    );
  };


  render() {

    const { genreId, city } = this.state;
    const { genres } = this.props;
    return (
      <View>
        <SelectBox
          keyName="genreId"
          placeholder="Genre"
          value={genreId}
          items={genres}
          onPress={this.handlePressShowModal}
        />
         <ListItem
          key="city"
          title={city ? city.fullName : "Select City"}
          chevron
          bottomDivider
          onPress={() => this.handleCitySearchShowModal()}
        />
        <ListItem
          key="skills"
          title="Skills"
          chevron={false}
          bottomDivider
          rightIcon={this.renderSkillAddIcon()}
        />
        {this.renderSkillList()}
      </View>
    );
  }
}

export default ProjectSearchFormScreen;
