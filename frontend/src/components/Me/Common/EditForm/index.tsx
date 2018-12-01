import * as React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { CLOSE_BUTTON, SUBMIT_BUTTON } from '../../../../constants/buttons';
import { CLOSE_ICON } from '../../../../constants/icons';
import {
  City,
  Genre,
  OccupationType,
  Skill,
  UserDetails,
  UserEditParams,
} from '../../../../interfaces';
import iconLoader from '../../../../utilities/iconLoader';
import { SelectBox, TextAreaListItem } from '../../../Common';

import {
  CITY_SEARCH_MODAL_SCREEN,
  SELECT_BOX_PICKER_SCREEN,
  SKILL_SEARCH_MODAL_SCREEN,
  TEXT_INPUT_SCREEN,
} from '../../../../constants/screens';

import {
  ICON_MAIN_TYPE,
  MINUS_CIRCLE_ICON,
  PLUS_ICON,
} from '../../../../constants/icons';

import styles from './styles';

interface Props {
  user: UserDetails;
  genres: Genre[];
  occupationTypes: OccupationType[];
  navigator: any;
  loading: boolean;
  error: any;
  onSubmit: (userEditParams: UserEditParams) => void;
}

interface State {
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
}

class EditForm extends React.Component<Props, State> {
  public static defaultProps = {
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
      skills: [],
    },
  };

  constructor(props) {
    super(props);
    const { user } = this.props;

    this.state = {
      displayName: user.displayName,
      introduction: user.introduction,
      occupation: user.occupation,
      occupationTypeId: user.occupationType
        ? user.occupationType.id
        : undefined,
      genreId: user.genre ? user.genre.id : undefined,
      companyName: user.companyName,
      schoolName: user.schoolName,
      city: user.city,
      skills: user.skills,
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  public render() {
    const { occupationTypes, genres } = this.props;

    const {
      displayName,
      introduction,
      occupation,
      genreId,
      occupationTypeId,
      companyName,
      schoolName,
      city,
      latitude,
      longitude,
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
          onPress={() =>
            this.handleTextInputModal(
              'displayName',
              displayName,
              'Enter Display Name',
            )
          }
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
          onPress={() =>
            this.handleTextInputModal(
              'occupation',
              occupation,
              'Enter Occupation',
            )
          }
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
          onPress={() =>
            this.handleTextInputModal(
              'companyName',
              companyName,
              'Enter Company Name',
            )
          }
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
          onPress={() =>
            this.handleTextInputModal(
              'schoolName',
              schoolName,
              'Enter School Name',
            )
          }
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

  protected handleDeleteSkill = (id: string) => {
    const skills = this.state.skills.filter((skill) => skill.id !== id);
    this.setState({ skills });
  }

  private buildUserEditParams = (): UserEditParams => {
    const { user } = this.props;
    const params = {};
    const stringKeys = [
      'displayName',
      'introduction',
      'occupation',
      'companyName',
      'schoolName',
      'genreId',
      'occupationTypeId',
    ];
    const objectKeys = ['city'];
    const arrayObjectKeys = ['skills'];
    const statePrioritizedKeys = ['longitude', 'latitude'];

    stringKeys.forEach((key) => {
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
        params[keyName] = this.state[key].map((item) => item.id);
      }
    });

    statePrioritizedKeys.forEach((key) => {
      if (this.state[key]) {
        params[key] = this.state[key];
      }
    });
    console.log('user edit', params);
    return params;
  }

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
  }

  private arrayObjectValueChanged = (key: string): boolean => {
    const currentObjectIds = this.state[key].map((item) => item.id);
    const previousObjectIds = this.props.user[key].map((item) => item.id);

    const intersectionCount = currentObjectIds.filter((id) =>
      previousObjectIds.includes(id),
    ).length;

    return (
      previousObjectIds.length !== intersectionCount ||
      currentObjectIds.length !== intersectionCount
    );
  }

  private handleNavigatorEvent = (e) => {

    if (e.type !== 'NavBarButtonPress') { return; }

    switch (e.id) {
      case SUBMIT_BUTTON:
        this.props.onSubmit(this.buildUserEditParams());
        break;

      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  }

  private handlePressShowModal = (
    items: any[],
    keyName: string,
    selectedValue: string | number | undefined,
  ) => {
    this.props.navigator.showModal({
      screen: SELECT_BOX_PICKER_SCREEN,
      passProps: {
        items,
        keyName,
        selectedValue,
        onPress: this.handleChangeValue,
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'CLOSE',
            id: CLOSE_BUTTON,
          },
        ],
      },
    });
  }

  private handleTextInputModal = (
    keyName: string,
    value: string | undefined,
    placeholder: string,
  ) => {
    this.props.navigator.showModal({
      screen: TEXT_INPUT_SCREEN,
      title: keyName.toUpperCase(),
      animationType: 'slide-up',
      passProps: {
        keyName,
        value,
        placeholder,
        onPress: this.handleChangeValue,
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'Close',
            id: CLOSE_BUTTON,
          },
        ],
      },
    });
  }

  private handleChangeValue = (
    keyName: string,
    value: string | number | undefined,
  ) => {
    const changedAttr = {};
    changedAttr[keyName] = value;
    console.log('updated key', changedAttr);
    this.setState(changedAttr);
  }

  private handleSkillSearchShowModal = () => {
    this.props.navigator.showModal({
      screen: SKILL_SEARCH_MODAL_SCREEN,
      title: 'Skill Search',
      animationType: 'slide-up',
      passProps: { onPressSkill: this.handleAddSkill },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'Close',
            id: CLOSE_BUTTON,
          },
        ],
      },
    });
  }

  private handleAddSkill = (skill: Skill) => {
    if (this.state.skills.find((skill) => skill.id === skill.id)) { return; }
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  }

  private handleCitySearchShowModal = () => {
    this.props.navigator.showModal({
      screen: CITY_SEARCH_MODAL_SCREEN,
      title: 'City Search',
      animationType: 'slide-up',
      passProps: {
        onPress: this.handleUpdateLocation,
        needLocationSearch: true,
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'Close',
            id: CLOSE_BUTTON,
          },
        ],
      },
    });
  }

  private handleUpdateLocation = (
    city: City,
    longitude: number | undefined = undefined,
    latitude: number | undefined = undefined,
  ) => {
    if (longitude && latitude) {
      this.setState({ city, longitude, latitude });
    } else {
      this.setState({ city });
    }
  }

  private renderSkillList = () => {
    return <FlatList data={this.state.skills} renderItem={this.renderSkill} />;
  }

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
  }

  private renderSkillAddIcon = () => {
    return (
      <Icon type={ICON_MAIN_TYPE} name={PLUS_ICON} size={24} color="black" />
    );
  }

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
  }
}

export default EditForm;
