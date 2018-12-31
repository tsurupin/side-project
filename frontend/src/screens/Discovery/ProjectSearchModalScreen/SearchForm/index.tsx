import * as React from 'react';
import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  SELECT_BOX_PICKER_SCREEN
} from '../../../../constants/screens';
import { Navigation } from 'react-native-navigation';
import { buildDefaultNavigationStack } from '../../../../utilities/navigationStackBuilder';
import { View, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SelectBox } from '../../../../components/Common';
import { APPLY_BUTTON, CLOSE_BUTTON } from '../../../../constants/buttons';

import { Skill, Genre, City, ProjectSearchParams } from '../../../../interfaces';
import IconLoader from '../../../../utilities/IconLoader';
import {
  CLOSE_ICON,
  MINUS_CIRCLE_ICON,
  PLUS_ICON,
  ICON_MAIN_TYPE,
  SMALL_ICON_SIZE,
  ICON_BLACK_COLOR
} from '../../../../constants/icons';
import styles from './styles';

type Props = {
  navigator: any;
  genres: Genre[];
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
  onSubmit: (searchParams: ProjectSearchParams) => void;
};

type State = {
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
};

const updateState = (key: keyof State, value: string | number | boolean) => (prevState: State): State => ({
  ...prevState,
  [key]: value
});

class SearchForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      genreId: props.genreId,
      city: props.city,
      skills: props.skills
    };

    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    const { genreId, city, skills } = this.state;

    switch (buttonId) {
      case APPLY_BUTTON:
        this.props.onSubmit({
          genreId,
          city,
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
    Navigation.showModal(
      buildDefaultNavigationStack({
        stackId: SKILL_SEARCH_MODAL_SCREEN,
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

  private handleChangeValue = (key: keyof State, value: string | number | boolean) => {
    this.setState(updateState(key, value));
  };

  private handleAddSkill = (skill: Skill) => {
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  private handleDeleteSkill = (skillId: string) => {
    const skills = this.state.skills.filter((skill) => skill.id !== skillId);
    this.setState({ skills });
  };

  private handlePressShowModal = (items: any[], keyName: string, selectedValue: string | number | undefined) => {
    this.props.navigator.showModal(
      buildDefaultNavigationStack({
        stackId: SELECT_BOX_PICKER_SCREEN,
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

  private handleCitySearchShowModal = () => {
    Navigation.showModal(
      buildDefaultNavigationStack({
        stackId: CITY_SEARCH_MODAL_SCREEN,
        screenName: CITY_SEARCH_MODAL_SCREEN,
        props: {
          onPress: this.handleAddCity
        },
        title: 'City Search',
        leftButton: {
          icon: IconLoader.getIcon(CLOSE_ICON),
          id: CLOSE_BUTTON
        }
      })
    );
    // this.props.navigator.showModal({
    //   screen: CITY_SEARCH_MODAL_SCREEN,
    //   title: 'City Search',
    //   animationType: 'slide-up',
    //   passProps: { onPress: this.handleAddCity },
    //   navigatorButtons: {
    //     leftButtons: [
    //       {
    //         title: 'Close',
    //         id: CLOSE_BUTTON
    //       }
    //     ]
    //   }
    // });
  };

  private handleAddCity = (city: City) => {
    this.setState({ city });
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
    const { genreId, city } = this.state;

    const { genres } = this.props;

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
}

export default SearchForm;
