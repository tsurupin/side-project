import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { FlatList, ScrollView } from 'react-native';
import { UserDetails, UserEditParams, Skill, City, Genre, OccupationType } from '../../../../interfaces';
import { ListItem, Icon } from 'react-native-elements';
import { SelectBox, TextAreaListItem } from '../../../Common';
import { CLOSE_BUTTON } from '../../../../constants/buttons';
import {
  CLOSE_ICON,
  PLUS_ICON,
  MINUS_CIRCLE_ICON,
  ICON_MAIN_TYPE,
  ICON_BLACK_COLOR,
  SMALL_ICON_SIZE
} from '../../../../constants/icons';
import IconLoader from '../../../../utilities/IconLoader';

import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  SELECT_BOX_PICKER_SCREEN,
  TEXT_INPUT_SCREEN
} from '../../../../constants/screens';

import styles from './styles';
import { buildDefaultNavigationStack } from '../../../../utilities/navigationStackBuilder';

type Props = {
  user: UserDetails;
  genres: Genre[];
  occupationTypes: OccupationType[];
  loading: boolean;
  error: any;
  onSubmit: (userEditParams: UserEditParams) => void;
};

type State = {
  displayName: string;
  introduction: string | undefined;
  occupation: string | undefined;
  occupationTypeId: string | undefined;
  genreId: string | undefined;
  companyName: string | undefined;
  schoolName: string | undefined;
  city: City | undefined;
  skills: Skill[];
  longitude?: number;
  latitude?: number;
};

const updateState = (key: keyof State, value: string | number | undefined) => (prevState: State): State => ({
  ...prevState,
  [key]: value
});

class EditForm extends React.Component<Props, State> {
  static defaultProps = {
    loading: false,
    user: {
      title: undefined,
      introduction: undefined,
      occupation: undefined,
      schoolName: undefined,
      companyName: undefined,
      occupationTypeId: undefined,
      genreId: undefined,
      city: undefined,
      skills: []
    }
  };

  constructor(props: Props) {
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
      skills: user.skills
    };
  }

  private buildUserEditParams = (): UserEditParams => {
    const { user } = this.props;
    const params = {} as { [key: string]: any };
    const stringKeys = [
      'displayName',
      'introduction',
      'occupation',
      'companyName',
      'schoolName',
      'genreId',
      'occupationTypeId'
    ];
    const objectKeys = ['city'];
    const arrayObjectKeys = ['skills'];
    const statePrioritizedKeys = ['longitude', 'latitude'];

    stringKeys.forEach((key: string) => {
      const currentValue = this.state[key];
      if (!(currentValue === user[key])) {
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
        const keyName = key === 'skills' ? 'skillIds' : `${key}Ids`;
        params[keyName] = this.state[key].map((item: { id: string }) => item.id);
      }
    });

    statePrioritizedKeys.forEach((key: string) => {
      if (this.state[key]) {
        params[key] = this.state[key];
      }
    });
    console.log('user edit', params);
    return params;
  };

  private objectValueChanged = (key: string): boolean => {
    const currentValue = this.state[key];
    const previousValue = this.props.user[key];

    if (currentValue && previousValue && currentValue.id === previousValue.id) {
      return false;
    }
    if (!currentValue && !previousValue) {
      return false;
    }
    return true;
  };

  private arrayObjectValueChanged = (key: string): boolean => {
    const currentObjectIds = this.state[key].map((item: { id: string }) => item.id);
    const previousObjectIds = this.props.user[key].map((item: { id: string }) => item.id);

    const intersectionCount = currentObjectIds.filter((id: string) => previousObjectIds.includes(id)).length;

    return previousObjectIds.length !== intersectionCount || currentObjectIds.length !== intersectionCount;
  };

  private handleSubmit = () => {
    this.props.onSubmit(this.buildUserEditParams());
  };

  private handlePressShowModal = (items: any[], keyName: string, selectedValue: string | number | undefined) => {
    Navigation.showModal(
      buildDefaultNavigationStack({
        screenName: SELECT_BOX_PICKER_SCREEN,
        props: {
          items,
          keyName,
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

  private handleTextInputModal = (keyName: string, value: string | undefined, placeholder: string) => {
    Navigation.showModal(
      buildDefaultNavigationStack({
        screenName: TEXT_INPUT_SCREEN,
        props: {
          keyName,
          value,
          placeholder,
          onPress: this.handleChangeValue
        },
        title: keyName.toUpperCase(),
        leftButton: {
          icon: IconLoader.getIcon(CLOSE_ICON),
          id: CLOSE_BUTTON
        }
      })
    );
  };

  private handleChangeValue = (keyName: keyof State, value: string | number | undefined) => {
    this.setState(updateState(keyName, value));
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

  private handleAddSkill = (skill: Skill) => {
    if (this.state.skills.find((currentSkill) => currentSkill.id === skill.id)) return;
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  protected handleDeleteSkill = (id: string) => {
    const skills = this.state.skills.filter((skill) => skill.id !== id);
    this.setState({ skills });
  };

  private handleCitySearchShowModal = () => {
    Navigation.showModal(
      buildDefaultNavigationStack({
        screenName: CITY_SEARCH_MODAL_SCREEN,
        props: {
          onPress: this.handleUpdateLocation,
          needLocationSearch: true
        },
        title: 'City Search',
        leftButton: {
          icon: IconLoader.getIcon(CLOSE_ICON),
          id: CLOSE_BUTTON
        }
      })
    );
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
    const { occupationTypes, genres } = this.props;

    const {
      displayName,
      introduction,
      occupation,
      genreId,
      occupationTypeId,
      companyName,
      schoolName,
      city
    } = this.state;

    return (
      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ListItem
          key="displayName"
          containerStyle={styles.itemContainer}
          title="Display Name"
          titleStyle={styles.itemTitle}
          rightTitle={displayName}
          rightTitleStyle={styles.rightTitle}
          chevron
          topDivider
          bottomDivider
          onPress={() => this.handleTextInputModal('displayName', displayName, 'Enter Display Name')}
        />

        <TextAreaListItem
          label="Introduction"
          keyName="introduction"
          placeholder="Enter Introduction"
          value={introduction}
          onPress={this.handleTextInputModal}
        />

        <ListItem
          key="occupation"
          containerStyle={styles.itemContainer}
          title="Occupation"
          titleStyle={styles.itemTitle}
          rightTitle={occupation}
          rightTitleStyle={styles.rightTitle}
          chevron
          topDivider
          bottomDivider
          onPress={() => this.handleTextInputModal('occupation', occupation, 'Enter Occupation')}
        />

        <SelectBox
          keyName="occupationTypeId"
          placeholder="Occupation Type"
          label="Occupation Type"
          value={occupationTypeId}
          items={occupationTypes}
          onPress={this.handlePressShowModal}
        />

        <SelectBox
          keyName="genreId"
          placeholder="Genre"
          label="Genre"
          value={genreId}
          items={genres}
          onPress={this.handlePressShowModal}
        />
        <ListItem
          key="companyName"
          containerStyle={styles.itemContainer}
          title="Company Name"
          titleStyle={styles.itemTitle}
          rightTitle={companyName}
          rightTitleStyle={styles.rightTitle}
          chevron
          topDivider
          bottomDivider
          onPress={() => this.handleTextInputModal('companyName', companyName, 'Enter Company Name')}
        />

        <ListItem
          key="schoolName"
          containerStyle={styles.itemContainer}
          title="School Name"
          titleStyle={styles.itemTitle}
          rightTitle={schoolName}
          rightTitleStyle={styles.rightTitle}
          chevron
          topDivider
          bottomDivider
          onPress={() => this.handleTextInputModal('schoolName', schoolName, 'Enter School Name')}
        />

        <ListItem
          key="city"
          containerStyle={styles.itemContainer}
          title="City"
          titleStyle={styles.itemTitle}
          rightTitle={city ? city.fullName : ''}
          rightTitleStyle={styles.rightTitle}
          chevron
          bottomDivider
          onPress={() => this.handleCitySearchShowModal()}
        />

        <ListItem
          key="skills"
          containerStyle={styles.itemContainer}
          title="Skills"
          titleStyle={styles.itemTitle}
          chevron={false}
          topDivider
          bottomDivider
          rightIcon={this.renderSkillAddIcon()}
          onPress={() => this.handleSkillSearchShowModal()}
        />
        {this.renderSkillList()}
      </ScrollView>
    );
  }
}

export default EditForm;
