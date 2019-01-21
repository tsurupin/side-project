import * as React from 'react';
import { SKILL_SEARCH_MODAL_SCREEN, SELECT_BOX_PICKER_SCREEN } from '../../../../constants/screens';
import { Navigation } from 'react-native-navigation';
import { buildDefaultNavigationStack } from '../../../../utilities/navigationStackBuilder';
import { View, FlatList, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SelectBox } from '../../../../components/Common';
import { CLOSE_BUTTON } from '../../../../constants/buttons';

import { Skill, Genre, Location, OccupationType, UserSearchParams } from '../../../../interfaces';
import IconLoader from '../../../../utilities/IconLoader';
import {
  CLOSE_ICON,
  PLUS_ICON,
  MINUS_CIRCLE_ICON,
  ICON_MAIN_TYPE,
  SMALL_ICON_SIZE,
  ICON_BLACK_COLOR
} from '../../../../constants/icons';
import styles from './styles';

type Props = {
  navigator: any;
  genres: Genre[];
  occupationTypes: OccupationType[];
  occupationTypeId: string | undefined;
  genreId: string | undefined;
  location: Location | undefined;
  isActive: boolean | undefined;
  skills: Skill[];
  onSubmit: (searchParams: UserSearchParams) => void;
};

type State = {
  genreId: string | undefined;
  occupationTypeId: string | undefined;
  location: Location | undefined;
  isActive: boolean | undefined;
  skills: Skill[];
};

type KeyNames = 'genreId' | 'occupationTypeId' | 'location' | 'isActive' | 'skills' | 'distance';

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

const updateState = (key: keyof State, value: string | number | boolean) => (prevState: State): State => ({
  ...prevState,
  [key]: value
});

class SearchForm extends React.Component<Props, State> {
  static defaultProps = {};
  constructor(props: Props) {
    super(props);
    this.state = {
      genreId: props.genreId,
      location: props.location,
      occupationTypeId: props.occupationTypeId,
      isActive: props.isActive,
      skills: props.skills
    };
  }

  private handleSubmit = () => {
    const { genreId, occupationTypeId, location, isActive, skills } = this.state;
    this.props.onSubmit({
      genreId,
      occupationTypeId,
      location,
      isActive,
      skills
    });
  };

  private handleSkillSearchShowModal = () => {
    Navigation.showModal(
      buildDefaultNavigationStack({
        screenName: SKILL_SEARCH_MODAL_SCREEN,
        props: {
          onPress: this.handleAddSkill
        },
        title: 'Skill Search',
        leftButton: {
          icon: IconLoader.getIcon(CLOSE_ICON),
          id: CLOSE_BUTTON
        }
      })
    );
  };

  private handleChangeValue = (key: KeyNames, value: string | number | boolean) => {
    if (key === 'distance') {
      this.handleChangeLocationValue(value as number);
    } else {
      this.setState(updateState(key, value));
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
      async () => {
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
    Navigation.showModal(
      buildDefaultNavigationStack({
        screenName: SELECT_BOX_PICKER_SCREEN,
        props: {
          items,
          keyName,
          label,
          selectedValue,
          onPress: this.handleChangeValue
        },
        leftButton: {
          icon: IconLoader.getIcon(CLOSE_ICON),
          id: CLOSE_BUTTON
        }
      })
    );
  };

  private renderSkillList = () => {
    return <FlatList data={this.state.skills} renderItem={this.renderSkill} />;
  };

  private renderSkill = (data: { item: Skill }) => {
    const skill: Skill = data.item;
    return (
      <ListItem key={skill.id} title={skill.name} bottomDivider rightIcon={this.renderSkillRemoveIcon(skill.id)} />
    );
  };

  private renderSkillAddIcon = () => {
    return <Icon type={ICON_MAIN_TYPE} name={PLUS_ICON} size={SMALL_ICON_SIZE} color={ICON_BLACK_COLOR} />;
  };

  private renderSkillRemoveIcon = (skillId: string) => {
    return (
      <Icon
        type={ICON_MAIN_TYPE}
        name={MINUS_CIRCLE_ICON}
        size={SMALL_ICON_SIZE}
        color={ICON_BLACK_COLOR}
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
