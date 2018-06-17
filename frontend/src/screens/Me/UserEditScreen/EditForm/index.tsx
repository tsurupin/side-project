import * as React from "react";
import { View, Button, Text } from "react-native";
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
      occupationTypeId: user.occupationType ? user.occupationType.id : undefined,
      genreId: user.genre ? user.genre.id : undefined,
      companyName: user.companyName,
      schoolName: user.schoolName,
      city: user.city,
      longitude: user.longitude,
      latitude: user.latitude,
      skills: user.skills,
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

  private handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  private handleUpdateLocation = (city: City, longitude: number | undefined = undefined, latitude: number | undefined = undefined) => {
    if (longitude && latitude) {
      this.setState({ city, longitude, latitude});
    } else {
      this.setState({city})
    }    
  };

  private handleSkillSearchShowModal = () => {
    this.props.navigator.showModal({
      screen: SKILL_SEARCH_MODAL_SCREEN,
      title: "Skill Search",
      animationType: "slide-up",
      passProps: { onPressSkill: this.handleAddSkill }
    });
  };

  private handleCitySearchShowModal = () => {
    this.props.navigator.showModal({
      screen: CITY_SEARCH_MODAL_SCREEN,
      title: "City Search",
      animationType: "slide-up",
      passProps: { onSubmit: this.handleUpdateLocation, needLocationSearch: true }
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
