import * as React from "react";
import { View } from "react-native";
import { UserDetails, UserEditParams, Skill, City } from "../../../../interfaces";
import { Input } from "react-native-elements";
import {
  SUBMIT_USER_EDIT_BUTTON,
  CANCEL_USER_EDIT_BUTTON
} from "../../../../constants/buttons";
import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN
} from "../../../../constants/screens";

import styles from "./styles";

type Props = {
  user: UserDetails;
  navigator: any;
  loading: boolean;
  error: any;
  onSubmit: (userEditParams: UserEditParams) => void;
};

type CityParams = {
  city: City;
  longitude?: number;
  latitude?: number;
}

class EditForm extends React.Component<Props, UserEditParams> {
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
      occupationTypeId: user.occupationTypeId,
      genreId: user.genreId,
      companyName: user.companyName,
      schoolName: user.schoolName,
      longitude: user.longitude,
      latitude: user.latitude,
      zipCode: "",
      cityId: user.cityId,
      skillIds: user.skills.map(skill => skill.id),
      skills: user.skills,
      cityName: user.cityName 
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = e => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case SUBMIT_USER_EDIT_BUTTON:
        this.props.onSubmit(this.state);
      case CANCEL_USER_EDIT_BUTTON:
        this.props.navigator.pop({
          animated: true
        });
    }
  };

  protected handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  protected handleUpdateCity = (cityParams: CityParams) => {
    this.setState({ cityParams });
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
    const { longitutde, latitude, cityId, cityName } = this.state;
    this.props.navigator.showModal({
      screen: CITY_SEARCH_MODAL_SCREEN,
      title: "City Search",
      animationType: "slide-up",
      passProps: { onSubmit: this.handleUpdateCity, longitude, latitude, cityId, cityName  }
    });
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
    const { displayName, occupation } = this.state;

    return (
      <View>
        <Input
          placeholder="Display Name"
          containerStyle={styles.inputContainer}
          value={displayName}
          onChangeText={e => this.setState({displayName: e})}
        />

        <Input
          placeholder="Occupation"
          containerStyle={styles.inputContainer}
          value={occupation}
          onChangeText={e => this.setState({occupation: e})}
        />
        <View style={styles.buttonFormBox}>
          <Text style={styles.textLabel}>Skill</Text>
          <Button
            iconLeft
            primary
            onPress={this.handleCitySearchModal}
          >
            <Icon name="beer" />
          </Button>
          
        </View>

        <View style={styles.buttonFormBox}>
          <Text style={styles.textLabel}>Skill</Text>
          <Button
            iconLeft
            primary
            onPress={this.handleSkillSearchModal}
          >
            <Icon name="beer" />
          </Button>
          {this.renderSkillList()}
        </View>
      </View>
    );
  }
}

export default EditForm;
