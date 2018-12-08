import * as React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { ProjectEditParams, Skill, City, Genre, ProjectDetails } from '../../../../interfaces';
import { ListItem, Icon } from 'react-native-elements';
import { CLOSE_ICON } from '../../../../constants/icons';
import IconLoader from '../../../../utilities/IconLoader';
import { SelectBox, TextAreaListItem } from '../../../Common';
import { CLOSE_BUTTON, SUBMIT_BUTTON } from '../../../../constants/buttons';
import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  SELECT_BOX_PICKER_SCREEN,
  TEXT_INPUT_SCREEN
} from '../../../../constants/screens';
import { PLUS_ICON, MINUS_CIRCLE_ICON, ICON_MAIN_TYPE } from '../../../../constants/icons';

import styles from './styles';

type Props = {
  genres: Genre[];
  navigator: any;
  loading: boolean;
  error: any;
  project: ProjectDetails;
  onSubmit: (projectEditParams: ProjectEditParams) => void;
};

type State = {
  title: string | undefined;
  leadSentence: string | undefined;
  motivation: string | undefined;
  requirement: string | undefined;
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
};

class EditForm extends React.Component<Props, State> {
  static defaultProps = {
    loading: false,
    project: {
      title: undefined,
      leadSentence: undefined,
      motivation: undefined,
      requirement: undefined,
      genreId: undefined,
      city: undefined,
      skills: []
    }
  };

  constructor(props) {
    super(props);

    const { project } = props;
    this.state = {
      title: project.title,
      leadSentence: project.leadSentence,
      motivation: project.motivation,
      requirement: project.requirement,
      genreId: project.genre ? project.genre.id : undefined,
      city: project.city,
      skills: project.skills
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private buildProjectEditParams = (): ProjectEditParams => {
    const { project } = this.props;
    const params = {};
    const stringKeys = ['title', 'leadSentence', 'motivation', 'requirement', 'genreId'];
    const objectKeys = ['city'];
    const arrayObjectKeys = ['skills'];

    stringKeys.forEach((key) => {
      const currentValue = this.state[key];

      if (!(currentValue === project[key])) {
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

    return params;
  };

  private objectValueChanged = (key: string): boolean => {
    const currentValue = this.state[key];
    const previousValue = this.props.project[key];

    if (currentValue && previousValue && currentValue.id === previousValue.id) {
      return false;
    } else if (!currentValue && !previousValue) {
      return false;
    } else {
      return true;
    }
  };

  private arrayObjectValueChanged = (key: string): boolean => {
    const currentObjectIds = this.state[key].map((item) => item.id);
    const previousObjectIds = this.props.project[key].map((item) => item.id);

    const intersectionCount = currentObjectIds.filter((id) => previousObjectIds.includes(id)).length;

    return previousObjectIds.length !== intersectionCount || currentObjectIds.length !== intersectionCount;
  };

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') return;
    switch (e.id) {
      case SUBMIT_BUTTON:
        this.props.onSubmit(this.buildProjectEditParams());
        break;
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private handlePressShowModal = (items: any[], keyName: string, selectedValue: string | number | undefined) => {
    this.props.navigator.showModal({
      screen: SELECT_BOX_PICKER_SCREEN,
      passProps: {
        items,
        keyName,
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

  private handleTextInputModal = (keyName: string, value: string | undefined, placeholder: string) => {
    this.props.navigator.showModal({
      screen: TEXT_INPUT_SCREEN,
      title: keyName.toUpperCase(),
      animationType: 'slide-up',
      passProps: {
        keyName,
        value,
        placeholder,
        onPress: this.handleChangeValue
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'Close',
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private handleChangeValue = (keyName: string, value: string | number | undefined) => {
    const changedAttr = {};
    changedAttr[keyName] = value;
    console.log('updated key', changedAttr);
    this.setState(changedAttr);
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
            title: 'Close',
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private handleAddSkill = (skill: Skill) => {
    if (this.state.skills.find((skill) => skill.id === skill.id)) return;
    const skills = Array.from(new Set(this.state.skills.concat(skill)));
    this.setState({ skills });
  };

  protected handleDeleteSkill = (id: string) => {
    const skills = this.state.skills.filter((skill) => skill.id !== id);
    this.setState({ skills });
  };

  private handleCitySearchShowModal = () => {
    this.props.navigator.showModal({
      screen: CITY_SEARCH_MODAL_SCREEN,
      title: 'City Search',
      animationType: 'slide-up',
      passProps: {
        onPress: this.handleUpdateLocation,
        needLocationSearch: true
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            title: 'Close',
            id: CLOSE_BUTTON
          }
        ]
      }
    });
  };

  private handleUpdateLocation = (
    city: City,
    longitude: number | undefined = undefined,
    latitude: number | undefined = undefined
  ) => {
    console.log(city);
    this.setState({ city });
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
    const { genres } = this.props;
    const { title, leadSentence, genreId, motivation, requirement, city } = this.state;

    return (
      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ListItem
          key="title"
          containerStyle={styles.itemContainer}
          title="Title"
          titleStyle={styles.itemTitle}
          rightTitle={title}
          rightTitleStyle={styles.rightTitle}
          chevron
          topDivider
          bottomDivider
          onPress={() => this.handleTextInputModal('title', title, 'Enter title')}
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

        <TextAreaListItem
          label="Lead Sentence"
          keyName="leadSentence"
          placeholder="Enter Lead Sentence"
          value={leadSentence}
          onPress={this.handleTextInputModal}
        />

        <TextAreaListItem
          label="Motivation"
          keyName="motivation"
          placeholder="Enter Motivation"
          value={motivation}
          onPress={this.handleTextInputModal}
        />

        <TextAreaListItem
          label="Requirement"
          keyName="requirement"
          placeholder="Enter Requirement"
          value={requirement}
          onPress={this.handleTextInputModal}
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
