import * as React from "react";
import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  PICKER_SCREEN
} from "../../../../constants/screens";

import { View, FlatList, Alert } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { SelectBox } from "../../../../components/Commons";
import { APPLY_BUTTON, CLOSE_BUTTON } from "../../../../constants/buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Skill,
  Genre,
  City,
  ProjectSearchParams
} from "../../../../interfaces";
import IconLoader from "../../../../utilities/iconLoader";
import { CLOSE_ICON } from "../../../../constants/icons";
import styles from "./styles";

type Props = {
  navigator: any;
  genres: Genre[];
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
  onSubmit: (searchParams: ProjectSearchParams) => void;
};

type State = {
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
};

class SearchForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      genreId: props.genreId,
      city: props.city,
      skills: props.skills
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }
  private handleNavigationEvent = (e) => {
    const { genreId, city, skills } = this.state;
    if (e.type !== "NavBarButtonPress") {
      return;
    }
    switch (e.id) {
      case APPLY_BUTTON:
        this.props.onSubmit({
          genreId: genreId,
          city: city,
          skills: skills
        });
        this.props.navigator.dismissModal();
        break;
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private handleSkillSearchShowModal = () => {
    this.props.navigator.showModal({
      screen: SKILL_SEARCH_MODAL_SCREEN,
      title: "Skill Search",
      animationType: "slide-up",
      passProps: { onPress: this.handleAddSkill },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: "CLOSE",
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private handleChangeValue = (
    key: string,
    value: string | number | boolean
  ) => {
    let changeAttr = {};
    changeAttr[key] = value;

    this.setState(changeAttr);
  };

  private handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  private handleDeleteSkill = (id: string) => {
    const skills = this.state.skills.filter((skill) => skill.id !== id);
    this.setState({ skills });
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
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: "CLOSE",
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private handleCitySearchShowModal = () => {
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

  private handleAddCity = (city: City) => {
    this.setState({ city });
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
      <Icon type="material-community" name="plus" size={24} color="black" />
    );
  };

  private renderSkillRemoveIcon = (skillId: string) => {
    return (
      <Icon
        type="material-community"
        name="minus-circle"
        size={24}
        color="black"
        onPress={() => this.handleDeleteSkill(skillId)}
      />
    );
  };

  render() {
    const { genreId, city } = this.state;

    const { genres } = this.props;

    console.log("city search form", city)

    return (
      <View style={styles.container}>
        <SelectBox
          keyName="genreId"
          placeholder="Genre"
          label="Genre"
          value={genreId}
          items={genres}
          onPress={this.handlePressShowModal}
        />
        <ListItem
          key="city"
          title={city ? city.fullName || "Select City" : "Select City"}
          chevron
          bottomDivider
          onPress={() => this.handleCitySearchShowModal()}
        />
        <ListItem
          key="skills"
          title="Skills"
          chevron={false}
          bottomDivider
          onPress={() => this.handleSkillSearchShowModal()}
          rightIcon={this.renderSkillAddIcon()}
        />
        {this.renderSkillList()}
      </View>
    );
  }
}

export default SearchForm;
