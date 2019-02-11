import * as React from 'react';
import { View, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SkillList } from '../../../components/Common/SkillSearchModalScreen';
import { CLOSE_BUTTON } from '../../../constants/buttons';
import { SkillsQuery } from '../../../queries/skills';
import { LoadingIndicator, SearchInput } from '../../../components/Common';
import { Skill, GraphQLErrorMessage } from '../../../interfaces';

import styles from './styles';

type Props = {
  navigator?: any;
  componentId: string;
  skills: Skill[];
  onPress: (skill: Skill) => void;
};

const initialState = {
  loading: false,
  name: '',
  errorMessage: ''
};

type State = Readonly<typeof initialState>;

type SkillsQueryOutput = {
  data: { skills: Skill[] };
  error: GraphQLErrorMessage | undefined;
  loading: boolean;
};

class SkillSearchModalScreen extends React.Component<Props, State> {
  static defaultProps = {
    skills: []
  };

  state = initialState;

  constructor(props: Props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case CLOSE_BUTTON:
        Navigation.dismissModal(this.props.componentId);

        break;
    }
  };

  private onPressSkill = (skill: Skill) => {
    this.props.onPress(skill);
    Navigation.dismissModal(this.props.componentId);
  };

  private handleChangeText = (name: string) => {
    this.setState({ name });
  };

  private renderSkillList = () => {
    const { name } = this.state;
    return (
      <SkillsQuery variables={{ name }}>
        {({ data, error, loading }: SkillsQueryOutput) => {
          if (loading) return <LoadingIndicator />;

          if (error) {
            Alert.alert(error.message);
            return <View />;
          }
          if (!data) return <View />;

          return <SkillList skills={data.skills} onPressSkill={this.onPressSkill} />;
        }}
      </SkillsQuery>
    );
  };

  private renderTextForm = () => {
    const { name } = this.state;
    return <SearchInput name={name} onChangeText={this.handleChangeText} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderTextForm()}
        {this.renderSkillList()}
      </View>
    );
  }
}

export default SkillSearchModalScreen;
