import * as React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { ProjectEditParams, Skill, City, Genre, ProjectDetails } from '../../../../interfaces';
import { ListItem, Icon } from 'react-native-elements';
import IconLoader from '../../../../utilities/IconLoader';
import { SelectBox, TextAreaListItem } from '../../../Common';
import { CLOSE_BUTTON } from '../../../../constants/buttons';
import {
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  SELECT_BOX_PICKER_SCREEN,
  TEXT_INPUT_SCREEN
} from '../../../../constants/screens';
import {
  CLOSE_ICON,
  PLUS_ICON,
  MINUS_CIRCLE_ICON,
  ICON_MAIN_TYPE,
  ICON_BLACK_COLOR,
  SMALL_ICON_SIZE
} from '../../../../constants/icons';

import styles from './styles';
import { Navigation } from 'react-native-navigation';
import { buildDefaultNavigationStack } from '../../../../utilities/navigationStackBuilder';

type Props = {
  genres: Genre[];
  loading: boolean;
  error: any;
  project: ProjectDetails;
  onSubmit: (projectEditParams: Partial<ProjectEditParams>) => void;
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

const updateState = (key: keyof State, value: string | number | undefined) => (prevState: State): State => ({
  ...prevState,
  [key]: value
});

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

  constructor(props: Props) {
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
  }

  private buildProjectEditParams = (): Partial<ProjectEditParams> => {
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
        params[keyName] = this.state[key].map((item: { id: string }) => item.id);
      }
    });

    return params;
  };

  private objectValueChanged = (key: string): boolean => {
    const currentValue = this.state[key];
    const previousValue = this.props.project[key];

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
    const previousObjectIds = this.props.project[key].map((item: { id: string }) => item.id);

    const intersectionCount = currentObjectIds.filter((id: string) => previousObjectIds.includes(id)).length;

    return previousObjectIds.length !== intersectionCount || currentObjectIds.length !== intersectionCount;
  };

  private handleSubmit = () => {
    this.props.onSubmit(this.buildProjectEditParams());
  };

  private handlePressShowModal = (items: any[], keyName: string, selectedValue: string | number | undefined) => {
    Navigation.showModal(
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

  private handleTextInputModal = (keyName: string, value: string | undefined, placeholder: string) => {
    Navigation.showModal(
      buildDefaultNavigationStack({
        stackId: TEXT_INPUT_SCREEN,
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
    Navigation.showModal(
      buildDefaultNavigationStack({
        stackId: CITY_SEARCH_MODAL_SCREEN,
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
    console.log(city);
    this.setState({ city });
  };

  private renderSkillList = () => {
    return <FlatList data={this.state.skills} renderItem={this.renderSkill} />;
  };

  private renderSkill = (data: any) => {
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
        size={SMALL_ICON_SIZE}
        color={ICON_BLACK_COLOR}
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
