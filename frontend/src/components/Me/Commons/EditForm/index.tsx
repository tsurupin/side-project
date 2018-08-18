import * as React from "react";
import { View, Button, Text, FlatList, ScrollView } from "react-native";
import {
  UserDetails,
  UserEditParams,
  Skill,
  City,
  Genre,
  OccupationType
} from "../../../../interfaces";
import { Input, ListItem } from "react-native-elements";
import { SUBMIT_BUTTON, CLOSE_BUTTON } from "../../../../constants/buttons";
import { CLOSE_ICON } from "../../../../constants/icons";
import IconLoader from "../../../../utilities/iconLoader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  InnerTextInput,
  InnerDetailsInput,
  InnerSelectInput
} from "../../../Commons";

import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  PICKER_SCREEN
} from "../../../../constants/screens";

import styles from "./styles";

type Props = {
  genres: Genre[];
  occupationTypes: OccupationType[];
  user: UserDetails;
  navigator: any;
  loading: boolean;
  error: any;
  onSubmit: (userEditParams: UserEditParams) => void;
};

type State = {
  displayName: string;
  introduction: string | undefined;
  occupation: string | undefined;
  occupationType: OccupationType | undefined;
  genre: Genre | undefined;
  companyName: string | undefined;
  schoolName: string | undefined;
  city: City | undefined;
  skills: Skill[];
  longitude?: number;
  latitude?: number;
};

class EditForm extends React.Component<Props, State> {
  static defaultProps = {
    loading: false
  };

  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      displayName: user.displayName,
      introduction: user.introduction,
      occupation: user.occupation,
      occupationType: user.occupationType,
      genre: user.genre,
      companyName: user.companyName,
      schoolName: user.schoolName,
      city: user.city,
      skills: user.skills
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private buildUserEditParams = (): UserEditParams => {
    const { user } = this.props;
    let params = {};
    const stringKeys = [
      "displayName",
      "introduction",
      "occupation",
      "companyName",
      "schoolName"
    ];
    const objectKeys = ["genre", "occupationType", "city"];
    const arrayObjectKeys = ["skills"];
    const statePrioritizedKeys = ["longitude", "latitude"];
    stringKeys.forEach((key) => {
      let currentValue = this.state[key];
      if (!currentValue === user[key]) {
        params[key] = currentValue;
      }
    });
    objectKeys.forEach((key) => {
      if (this.objectValueChanged(key)) {
        params[`${key}Id`] = this.state[key] ? this.state[key].id : undefined;
      }
    });

    arrayObjectKeys.forEach((key) => {
      if (this.arrayObjectValueChanged(key)) {
        let keyName = key === "skills" ? "skillIds" : `${key}Ids`;
        params[keyName] = this.state[key].map((item) => item.id);
      }
    });

    statePrioritizedKeys.forEach((key) => {
      if (this.state[key]) {
        params[key] = this.state[key];
      }
    });
    return params;
  };

  private objectValueChanged = (key: string): boolean => {
    const currentValue = this.state[key];
    const previousValue = this.props.user[key];

    if (currentValue && previousValue && currentValue.id === previousValue.id) {
      return false;
    } else if (!currentValue && !previousValue) {
      return false;
    } else {
      return true;
    }
  };

  private arrayObjectValueChanged = (key: string): boolean => {
    const currentObjectIds = this.state[key].map((item) => item.id);
    const previousObjectIds = this.props.user[key].map((item) => item.id);

    const intersectionCount = currentObjectIds.filter((id) =>
      previousObjectIds.includes(id)
    ).length;

    return (
      previousObjectIds.length !== intersectionCount ||
      currentObjectIds.length !== intersectionCount
    );
  };

  private handleNavigatorEvent = (e) => {
    if (e.type !== "NavBarButtonPress") return;

    switch (e.id) {
      case SUBMIT_BUTTON:
        this.props.onSubmit(this.buildUserEditParams());
        break;
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private handleObjectShowModal = (key: string) => {
    this.props.navigator.showModal({
      screen: PICKER_SCREEN,
      passProps: {
        items: this.props[`${key}s`],
        keyName: "genre",
        selectedValue: this.state[key] ? this.state[key].id : undefined,
        onPress: this.handleObjectChange
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

  private handleObjectChange = (key: string, value: string | number) => {
    let changedAttr = {};
    const genre = this.props[`${key}s`].find((item) => item.id == value);
    changedAttr[key] = genre;

    this.setState(changedAttr);
  };

  private handleSkillSearchShowModal = () => {
    this.props.navigator.showModal({
      screen: SKILL_SEARCH_MODAL_SCREEN,
      title: "Skill Search",
      animationType: "slide-up",
      passProps: { onPressSkill: this.handleAddSkill },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: "Close",
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private handleAddSkill = (skill: Skill) => {
    if (this.state.skills.find((skill) => skill.id === skill.id)) return;
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  protected handleDeleteSkill = (id: string) => {
    const skills = this.state.skills.filter((skill) => skill.id !== id);
    this.setState({ skills });
  };

  private handleCitySearchShowModal = () => {
    this.props.navigator.showModal({
      screen: CITY_SEARCH_MODAL_SCREEN,
      title: "City Search",
      animationType: "slide-up",
      passProps: {
        onPress: this.handleUpdateLocation,
        needLocationSearch: true
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: "Close",
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private handleUpdateLocation = (
    city: City,
    longitude: number | undefined = undefined,
    latitude: number | undefined = undefined
  ) => {
    if (longitude && latitude) {
      this.setState({ city, longitude, latitude });
    } else {
      this.setState({ city });
    }
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
    const {
      displayName,
      introduction,
      occupation,
      occupationType,
      genre,
      companyName,
      schoolName,
      city,
      skills,
      latitude,
      longitude
    } = this.state;

    return (
      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <InnerTextInput
          label="Display Name"
          placeholder="Enter Your Display Name"
          value={displayName}
          onChange={(key: string, value: string) => {
            this.setState({ displayName: value });
          }}
        />
        <InnerDetailsInput
          label="Introduction"
          placeholder="Enter Introduction"
          value={introduction}
          onChange={(key: string, value: string) => {
            this.setState({ introduction: value });
          }}
        />

        <InnerTextInput
          label="Occupation"
          placeholder="Enter Your Occupation"
          value={occupation}
          onChange={(key: string, value: string) => {
            this.setState({ occupation: value });
          }}
        />

        <InnerSelectInput
          placeholder="Select OccupationType"
          value={occupationType ? occupationType.name : undefined}
          label="Occupation Type"
          onPress={() => this.handleObjectShowModal("occupationType")}
        />
        <InnerSelectInput
          placeholder="Select Genre"
          value={genre ? genre.name : undefined}
          label="Genre"
          onPress={() => this.handleObjectShowModal("genre")}
        />
        <InnerTextInput
          label="Company Name"
          placeholder="Enter Your Company Name"
          value={companyName}
          onChange={(key: string, value: string) => {
            this.setState({ companyName: value });
          }}
        />
        <InnerTextInput
          label="School Name"
          placeholder="Enter Your School Name"
          value={schoolName}
          onChange={(key: string, value: string) => {
            this.setState({ schoolName: value });
          }}
        />

        <InnerSelectInput
          placeholder="Select City"
          value={city ? city.fullName : ""}
          label="City"
          style={{ marginBottom: 0 }}
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
      </ScrollView>
    );
  }
}

export default EditForm;
