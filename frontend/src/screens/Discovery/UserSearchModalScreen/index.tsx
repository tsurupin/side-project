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
    activeness: [
      {
        name: "Active within 72 hours",
        value: true
      },
      {
        name: "Not Active",
        value: false
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

  protected handleNavigationEvent = (e) => {
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
      case BACK_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
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
            icon: getIcon(CLOSE_ICON),
            title: "CLOSE",
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  protected handleChangeValue = (
    key: string,
    value: string | number | boolean
  ) => {
    let changeAttr = {};
    changeAttr[key] = value;
    this.setState(changeAttr);
  };

  protected handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  protected handleDeleteSkill = (id: string) => {
    const skills = this.state.skills.filter((skill) => skill.id !== id);
    this.setState({ skills });
  };

  private handlePressShowModal = (
    items: any[],
    selectedValue: string | number | undefined
  ) => {
    this.props.navigator.showModal({
      screen: PICKER_SCREEN,
      passProps: {
        items,
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
          key="occupationTypeId"
          placeholder="OccupationType"
          value={occupationTypeId}
          items={occupationTypes}
          onPress={this.handlePressShowModal}
        />
        <SelectBox
          key="distance"
          placeholder="Distance"
          value={distance}
          items={distances}
          onPress={this.handlePressShowModal}
        />
        <SelectBox
          key="genreId"
          placeholder="Genre"
          value={genreId}
          items={genres}
          onPress={this.handlePressShowModal}
        />
        <ListItem
          title="Active within 72 hours"
          chevron
          bottomDivider
          switch={{
            value: isActive, 
            onValueChange: (value: boolean) => this.handleChangeValue("active", value)
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

      // <Container>
      //   <Content>
      //     <Form>
      //     <Picker
      //         mode="dropdown"
      //         iosIcon={<Icon name="ios-arrow-down-outline" />}
      //         placeholder="Select person's type"
      //         placeholderStyle={{ color: "#bfc6ea" }}
      //         placeholderIconColor="#007aff"
      //         style={styles.pickerContainer}
      //         selectedValue={genreId}
      //         onValueChange={(value) => {
      //           this.handleValueChange("occupationTypeId", value);
      //         }}
      //       >
      //         {this.props.occupationTypes.map((occupationType) => {
      //           return (
      //             <Picker.Item
      //               key={occupationType.id}
      //               label={occupationType.name}
      //               value={occupationType.id}
      //             />
      //           );
      //         })}
      //       </Picker>
      //       <Picker
      //         mode="dropdown"
      //         iosIcon={<Icon name="ios-arrow-down-outline" />}
      //         placeholder="Select distance"
      //         placeholderStyle={{ color: 'red', flex: 1, flexDirection: "row", justifyContent: 'space-between', width: '100%' }}
      //         placeholderIconColor="#007aff"
      //         style={styles.pickerContainer}
      //         selectedValue={distance}
      //         onValueChange={(value) =>
      //           this.handleValueChange("distance", value)
      //         }
      //       >
      //         {this.props.distances.map((distance, i) => {
      //           return (
      //             <Picker.Item
      //               key={i}
      //               label={distance.name}
      //               value={distance.value}
      //             />
      //           );
      //         })}
      //       </Picker>
      //       <Picker
      //         mode="dropdown"
      //         iosIcon={<Icon name="ios-arrow-down-outline" />}
      //         placeholder="Select person's type"
      //         placeholderStyle={{ color: "#bfc6ea" }}
      //         placeholderIconColor="#007aff"
      //         style={styles.pickerContainer}
      //         selectedValue={genreId}
      //         onValueChange={(value) => {
      //           this.handleValueChange("genreId", value);
      //         }}
      //       >
      //         {this.props.occupationTypes.map((occupationType) => {
      //           return (
      //             <Picker.Item
      //               key={occupationType.id}
      //               label={occupationType.name}
      //               value={occupationType.id}
      //             />
      //           );
      //         })}
      //       </Picker>

      //       <Picker
      //         mode="dropdown"
      //         iosIcon={<Icon name="ios-arrow-down-outline" />}
      //         placeholder="Select person's activeness"
      //         placeholderStyle={{ color: "#bfc6ea" }}
      //         placeholderIconColor="#007aff"
      //         style={styles.pickerContainer}
      //         selectedValue={isActive}
      //         onValueChange={(value) =>
      //           this.handleValueChange("isActive", value)
      //         }
      //       >
      //         {this.props.activeness.map((active, i) => {
      //           return (
      //             <Picker.Item
      //               key={i}
      //               label={active.name}
      //               value={active.value}
      //             />
      //           );
      //         })}
      //       </Picker>
      //       <View style={styles.buttonFormBox}>
      //         <Text style={styles.textLabel}>Skill</Text>
      //         <Button
      //           iconLeft
      //           primary
      //           onPress={this.handleSkillSearchShowModal}
      //         >
      //           <Icon name="beer" />
      //         </Button>
      //         {this.renderSkillList()}
      //       </View>
      //     </Form>
      //   </Content>
      // </Container>
    );
  }
}

export default UserSearchFormScreen;
