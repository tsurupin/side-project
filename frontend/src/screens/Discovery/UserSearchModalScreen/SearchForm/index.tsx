import * as React from 'react';
import { SKILL_SEARCH_MODAL_SCREEN, SELECT_BOX_PICKER_SCREEN } from '../../../../constants/screens';

import { View, FlatList, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SelectBox } from '../../../../components/Common';
import { APPLY_BUTTON, CLOSE_BUTTON } from '../../../../constants/buttons';

import { Skill, Genre, Location, OccupationType, UserSearchParams } from '../../../../interfaces';
import IconLoader from '../../../../utilities/IconLoader';
import { CLOSE_ICON, PLUS_ICON, MINUS_CIRCLE_ICON, ICON_MAIN_TYPE } from '../../../../constants/icons';
import styles from './styles';

type Props = {
  navigator: any;
  genres: Genre[];
  occupationTypes: OccupationType[];
  occupationTypeId: string | undefined;
  genreId: string | undefined;
  location: Location | undefined;
  isActive: boolean;
  skills: Skill[];
  onSubmit: (searchParams: UserSearchParams) => void;
};

type State = {
  genreId: string | undefined;
  occupationTypeId: string | undefined;
  location: Location | undefined;
  isActive: boolean;
  skills: Skill[];
};

const DISTANCES = [
  {
    name: '5 miles',
    value: 5
  },
  {
    name: '10 miles',
    value: 10
  },
  {
    name: '20 miles',
    value: 20
  },
  {
    name: "doesn't care",
    value: undefined
  }
];

class SearchForm extends React.Component<Props, State> {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      genreId: props.genreId,
      location: props.location,
      occupationTypeId: props.occupationTypeId,
      isActive: props.isActive,
      skills: props.skills
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }
  private handleNavigationEvent = (e) => {
    const { genreId, occupationTypeId, location, isActive, skills } = this.state;
    if (e.type !== 'NavBarButtonPress') {
      return;
    }
    switch (e.id) {
      case APPLY_BUTTON:
        this.props.onSubmit({
          genreId,
          occupationTypeId,
          location,
          isActive,
          skills
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
      title: 'Skill Search',
      animationType: 'slide-up',
      passProps: { onPress: this.handleAddSkill },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'CLOSE',
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private handleChangeValue = (key: string, value: string | number | boolean) => {
    if (key === 'distance') {
      this.handleChangeLocationValue(value as number);
    } else {
      const changeAttr = {};
      changeAttr[key] = value;

      this.setState(changeAttr);
    }
  };

  private handleChangeLocationValue = (distance: number) => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        const location: Location = {
          latitude,
          longitude,
          distance
        };
        this.setState({ location });
      },
      async (error) => {
        console.log(error);
        Alert.alert('Needs to turn location on');
      }
    );
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
    label: string,
    selectedValue: string | number | undefined
  ) => {
    this.props.navigator.showModal({
      screen: SELECT_BOX_PICKER_SCREEN,
      passProps: {
        items,
        keyName,
        label,
        selectedValue,
        onPress: this.handleChangeValue
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'CLOSE',
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private renderSkillList = () => {
    return <FlatList data={this.state.skills} renderItem={this.renderSkill} />;
  };

  private renderSkill = (data) => {
    const skill: Skill = data.item;
    return (
      <ListItem key={skill.id} title={skill.name} bottomDivider rightIcon={this.renderSkillRemoveIcon(skill.id)} />
    );
  };

  private renderSkillAddIcon = () => {
    return <Icon type={ICON_MAIN_TYPE} name={PLUS_ICON} size={24} color="black" />;
  };

  private renderSkillRemoveIcon = (skillId: string) => {
    return (
      <Icon
        type={ICON_MAIN_TYPE}
        name={MINUS_CIRCLE_ICON}
        size={24}
        color="black"
        onPress={() => this.handleDeleteSkill(skillId)}
      />
    );
  };

  render() {
    const { genreId, occupationTypeId, location, isActive } = this.state;

    const { genres, occupationTypes } = this.props;

    return (
      <View style={styles.container}>
        <SelectBox
          keyName="occupationTypeId"
          placeholder="OccupationType"
          label="Occupation Type"
          needTopDivider={true}
          value={occupationTypeId}
          items={occupationTypes}
          onPress={this.handlePressShowModal}
        />
        <SelectBox
          keyName="distance"
          label="Distance"
          placeholder="Distance"
          value={location ? location.distance : undefined}
          items={DISTANCES}
          onPress={this.handlePressShowModal}
        />
        <SelectBox
          keyName="genreId"
          label="Genre"
          placeholder="Genre"
          value={genreId}
          items={genres}
          onPress={this.handlePressShowModal}
        />
        <ListItem
          key="active"
          title="Active within 72 hours"
          chevron={false}
          bottomDivider
          switch={{
            value: isActive,
            onValueChange: (value: boolean) => this.handleChangeValue('isActive', value)
          }}
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
