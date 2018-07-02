import * as React from "react";

import {
  SKILL_SEARCH_MODAL_SCREEN,
  PICKER_SCREEN
} from "../../../constants/screens";

import { View, FlatList, Switch } from "react-native";
import { ListItem } from "react-native-elements";
import { SelectBox } from "../../../components/Commons";
import { APPLY_BUTTON, CLOSE_BUTTON } from "../../../constants/buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// f
import {
  Skill,
  Genre,
  OccupationType,
  UserSearchParams
} from "../../../interfaces";
import { getIcon } from "../../../utilities/iconLoader";
import { CLOSE_ICON } from "../../../constants/icons";

import styles from "./styles";

type Props = {
  navigator: any;
  genres: Genre[];
  occupationTypes: OccupationType[];
  distance?: number | undefined;
  isActive?: boolean | undefined;
  skillIds?: string[];
  distances: any[];
  interests: any[];
  activeness: any[];
  skills: Skill[];
  client: any;
  onSubmit: (searchParams: UserSearchParams) => void;
};

type State = {
  genreId: string;
  occupationTypeId?: string | undefined;
  distance?: number | undefined;
  isActive: boolean;
  skillIds?: string[];
  skills: Skill[];
};

class UserSearchFormScreen extends React.Component<Props, State> {
  static defaultProps = {
    genreId: 1,
    distance: null,
    occupationTypeId: 1,
    isActive: false,
    skillIds: null,
    occupationTypes: [
      {
        id: 1,
        name: "Engineer"
      },
      {
        id: 2,
        name: "Designer"
      },
      {
        id: 3,
        name: "Hastler"
      }
    ],
    distances: [
      {
        name: "5 miles",
        value: 5
      },
      {
        name: "10 miles",
        value: 10
      },
      {
        name: "20 miles",
        value: 20
      },
      {
        name: "doesn't care",
        value: null
      }
    ],
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
      distance: props.distance,
      occupationTypeId: props.occupationTypeId,
      isActive: props.isActive,
      skillIds: props.skillIds,
      skills: props.skills
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }

  private handleNavigationEvent = (e) => {
    const {
      genreId,
      occupationTypeId,
      distance,
      isActive,
      skills
    } = this.state;
    if (e.type !== "NavBarButtonPress") {
      return;
    }
    switch (e.id) {
      case APPLY_BUTTON:
        this.props.onSubmit({
          genreId: genreId,
          occupationTypeId: occupationTypeId,
          distance: distance,
          isActive: isActive,
          skillIds: skills.map((skill) => skill.id)
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
            icon: getIcon(CLOSE_ICON),
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
    console.log(changeAttr);
  
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
            icon: getIcon(CLOSE_ICON),
            title: "CLOSE",
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private renderSkillList = () => {
    return (
      <FlatList
        data={this.state.skills}
        renderItem={this.renderSkill}
      />
    );
  };

  private renderSkill = (skill) => {
    return (
      <ListItem
        key={skill.id}
        title={skill.name}
        rightIcon={this.renderSkillRemoveIcon(skill.id)}
      />        
    );
  }


  private renderSkillChangeIcon = () => {
    return (
      <MaterialCommunityIcons
        name="plus"
        onPress={() => this.handleSkillSearchShowModal()}
      />
    );
  };

  private renderSkillRemoveIcon = (skillId: string) => {
    return(
      <MaterialCommunityIcons
        name="minus-circle"
        onPress={() => this.handleDeleteSkill(skillId)}
      />
    )
  }

  render() {
    const {
      genreId,
      occupationTypeId,
      distance,
      isActive,
      skills
    } = this.state;

    const { genres, occupationTypes, distances } = this.props;

    return (
      <View>
        <SelectBox
          keyName="occupationTypeId"
          placeholder="OccupationType"
          value={occupationTypeId}
          items={occupationTypes}
          onPress={this.handlePressShowModal}
        />
        <SelectBox
          keyName="distance"
          placeholder="Distance"
          value={distance}
          items={distances}
          onPress={this.handlePressShowModal}
        />
        <SelectBox
          keyName="genreId"
          placeholder="Genre"
          value={genreId}
          items={genres}
          onPress={this.handlePressShowModal}
        />
        <ListItem
          title="Active within 72 hours"
          chevron={false}
          bottomDivider
          switch={{
            value: isActive, 
            onValueChange: (value: boolean) => this.handleChangeValue("isActive", value)
          }}
        />
        <ListItem
          title="Skills"
          chevron={false}
          bottomDivider
          rightIcon={this.renderSkillChangeIcon()}
        />
        {this.renderSkillList()}
      </View>

    );
  }
}

export default UserSearchFormScreen;
