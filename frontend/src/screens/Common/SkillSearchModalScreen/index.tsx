import * as React from 'react';
import { Text, View } from 'react-native';

import {
  ErrorMessage,
  LoadingIndicator,
  SearchInput,
} from '../../../components/Common';
import { SkillList } from '../../../components/Common/SkillSearchModalScreen';
import { BACK_BUTTON, CLOSE_BUTTON } from '../../../constants/buttons';
import { USER_SEARCH_MODAL_SCREEN } from '../../../constants/screens';
import { Skill } from '../../../interfaces';
import { SkillsQuery } from '../../../queries/skills';

import styles from './styles';

interface Props {
  navigator?: any;
  skills: Skill[];
  onPress: (skill: Skill) => void;
}

interface State {
  loading: boolean;
  name: string;
  errorMessage: string;
}

class SkillSearchModalScreen extends React.Component<Props, State> {
  public static defaultProps = {
    skills: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: '',
      errorMessage: '',
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }

  public render() {
    return (
      <View style={styles.container}>
        {this.renderTextForm()}
        {this.renderSkillList()}
      </View>
    );
  }

  private handleNavigationEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') {
      return;
    }
    switch (e.id) {
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  }

  private onPressSkill = (skill: Skill) => {
    this.props.onPress(skill);
    this.props.navigator.dismissModal();
  }

  private handleChangeText = (name: string) => {
    this.setState({ name });
  }

  private renderSkillList = () => {
    const { name } = this.state;
    return (
      <SkillsQuery variables={{ name }}>
        {({ data, error, loading }) => {
          if (loading) { return <LoadingIndicator />; }

          if (error) { return <ErrorMessage {...error} />; }

          if (!data) { return <View/>; }

          return (
            <SkillList skills={data.skills} onPressSkill={this.onPressSkill} />
          );
        }}
      </SkillsQuery>
    );
  }

  private renderTextForm = () => {
    const { name } = this.state;
    return <SearchInput name={name} onChangeText={this.handleChangeText} />;
  }
}

export default SkillSearchModalScreen;
