import * as React from 'react';
import {
  CITY_SEARCH_MODAL_SCREEN,
  SELECT_BOX_PICKER_SCREEN,
  SKILL_SEARCH_MODAL_SCREEN,
} from '../../../../constants/screens';

import { Alert, FlatList, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { SelectBox } from '../../../../components/Common';
import { APPLY_BUTTON, CLOSE_BUTTON } from '../../../../constants/buttons';

import {
  CLOSE_ICON,
  ICON_MAIN_TYPE,
  MINUS_CIRCLE_ICON,
  PLUS_ICON,
} from '../../../../constants/icons';
import {
  City,
  Genre,
  ProjectSearchParams,
  Skill,
} from '../../../../interfaces';
import iconLoader from '../../../../utilities/iconLoader';
import styles from './styles';

interface Props {
  navigator: any;
  genres: Genre[];
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
  onSubmit: (searchParams: ProjectSearchParams) => void;
}

interface State {
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
}

class SearchForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      genreId: props.genreId,
      city: props.city,
      skills: props.skills,
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }

  public render() {
    const { genreId, city } = this.state;

    const { genres } = this.props;

    console.log('city search form', city);

    return (
      <View style={styles.container}>
        <SelectBox
          keyName="genreId"
          placeholder="Genre"
          label="Genre"
          value={genreId}
          items={genres}
          onPress={this.handlePressShowModal}
        />
        <ListItem
          key="city"
          title={city ? city.fullName || 'Select City' : 'Select City'}
          chevron
          bottomDivider
          onPress={() => this.handleCitySearchShowModal()}
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
  private handleNavigationEvent = (e) => {
    const { genreId, city, skills } = this.state;
    if (e.type !== 'NavBarButtonPress') {
      return;
    }
    switch (e.id) {
      case APPLY_BUTTON:
        this.props.onSubmit({
          genreId,
          city,
          skills,
        });
        this.props.navigator.dismissModal();
        break;
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  }

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
            id: CLOSE_BUTTON,
          },
        ],
      },
    });
  }

  private handleChangeValue = (
    key: string,
    value: string | number | boolean,
  ) => {
    const changeAttr = {};
    changeAttr[key] = value;

    this.setState(changeAttr);
  }

  private handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  }

  private handleDeleteSkill = (id: string) => {
    const skills = this.state.skills.filter((skill) => skill.id !== id);
    this.setState({ skills });
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

  private handleCitySearchShowModal = () => {
    this.props.navigator.showModal({
      screen: CITY_SEARCH_MODAL_SCREEN,
      title: 'City Search',
      animationType: 'slide-up',
      passProps: { onPress: this.handleAddCity },
      navigatorButtons: {
        leftButtons: [
          {
            title: 'Close',
            id: CLOSE_BUTTON,
          },
        ],
      },
    });
  }

  private handleAddCity = (city: City) => {
    this.setState({ city });
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

export default SearchForm;
