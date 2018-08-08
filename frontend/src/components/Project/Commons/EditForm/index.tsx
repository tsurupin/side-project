import * as React from "react";
import { View, Button, Text, FlatList, ScrollView } from "react-native";
import {
  ProjectEditParams,
  Skill,
  City,
  Genre,
  ProjectDetails
} from "../../../../interfaces";
import { Input, ListItem } from "react-native-elements";
import { CLOSE_ICON } from "../../../../constants/icons";
import { getIcon } from "../../../../utilities/iconLoader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  InnerTextInput,
  InnerDetailsInput,
  InnerSelectInput
} from "../../../../components/Commons";
import { CLOSE_BUTTON, SUBMIT_BUTTON } from "../../../../constants/buttons";
import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  PICKER_SCREEN
} from "../../../../constants/screens";

import styles from "./styles";

type Props = {
  genres: Genre[];
  navigator: any;
  loading: boolean;
  error: any;
  project: ProjectDetails;
  onSubmit: (projectEditParams: ProjectEditParams) => void;
};

type State = {
  title: string | undefined;
  leadSentence: string | undefined;
  motivation: string | undefined;
  requirement: string | undefined;
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
};

class EditForm extends React.Component<Props, State> {
  static defaultProps = {
    loading: false,
    project: {
      title: undefined,
      leadSentence: undefined,
      motivation: undefined,
      requirement: undefined,
      genre: undefined,
      city: undefined,
      skills: []
    }
  };

  constructor(props) {
    super(props);

    const { project } = props;
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
    const stringKeys = [
      "title",
      "leadSentence",
      "motivation",
      "requirement",
      "genreId"
    ];
    const objectKeys = ["city"];
    const arrayObjectKeys = ["skills"];
    // stringKeys.forEach((key) => (params[key] = this.state[key]));
    // objectKeys.forEach((key) => {
    //   if (this.state[key]) {
    //     params[`${key}Id`] = this.state[key] ? this.state[key].id : undefined;
    //   }
    // });

    // arrayObjectKeys.forEach((key) => {
    //   params[`${key}Ids`] = this.state[key].map(item => item.id);
    // });

    // return params;

     stringKeys.forEach(key => {
      let currentValue = this.state[key];
      if (!currentValue === project[key]) {
        params[key] = currentValue;
      }
    });

    objectKeys.forEach(key => {
      if (this.objectValueChanged(key)) {
        params[`${key}Id`] = this.state[key] ? this.state[key].id : undefined;
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

  private handleNavigatorEvent = (e) => {
    console.log("navigation", e)
    if (e.type !== "NavBarButtonPress") return;
    switch (e.id) {
      case SUBMIT_BUTTON:
        this.props.onSubmit(this.buildProjectEditParams());
        break;
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private handleChangeValue = (key: string, value: number) => {
    let changeAttr = {};
    changeAttr[key] = value;
    console.log(changeAttr);

    this.setState(changeAttr);
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

  private handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
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
            icon: getIcon(CLOSE_ICON),
            title: "Close",
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
      passProps: {
        onPress: this.handleUpdateLocation,
        needLocationSearch: true
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: getIcon(CLOSE_ICON),
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
    console.log(city);
    this.setState({ city });
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
    const {
      title,
      leadSentence,
      genreId,
      motivation,
      requirement,
      city
    } = this.state;
    const { genres } = this.props;

    const genre = genres.find((genre) => genre.id === genreId);
    return (
      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <InnerTextInput
          label="title"
          placeholder="Enter Title"
          value={title}
          onChange={(key: string, value: string) => {
            console.log(key, value);
            this.setState({ title: value });
          }}
        />
        <InnerSelectInput
          placeholder="Select Genre"
          value={genre ? genre.name : undefined}
          label="Genre"
          onPress={() => this.handlePressShowModal(genres, "genreId", genreId)}
        />
        <InnerSelectInput
          placeholder="Select City"
          value={city ? city.fullName : ""}
          label="City"
          style={{ marginBottom: 0 }}
          onPress={() => this.handleCitySearchShowModal()}
        />

        <InnerDetailsInput
          label="Lead Sentence"
          placeholder="Enter Lead Sentence"
          value={leadSentence}
          onChange={(key: string, value: string) => {
            this.setState({ leadSentence: value });
          }}
        />

        <InnerDetailsInput
          label="Motivation"
          placeholder="Enter Motivation"
          value={motivation}
          onChange={(key: string, value: string) => {
            this.setState({ motivation: value });
          }}
        />
        <InnerDetailsInput
          label="Requirement"
          placeholder="Enter Requirement"
          value={requirement}
          onChange={(key: string, value: string) => {
            this.setState({ requirement: value });
          }}
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
