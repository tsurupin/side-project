import * as React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ListItem, Input } from "react-native-elements";
import { USER_SEARCH_MODAL_SCREEN, PROJECT_SEARCH_MODAL_SCREEN } from "../../../constants/screens";
import {
  CityList,
  CityInput
} from "../../../components/Discovery/CitySearchModalScreen";
import { BACK_BUTTON } from "../../../constants/buttons";
import { CityListQuery } from "../../../queries/cities";
import { City } from "../../../interfaces";
import styles from "./styles";

type Props = {
  navigator?: any;
  onPress: (cityId: string) => void;
};

type State = {
  loading: boolean;
  name: string;
  errorMessage: string;
};

class CitySearchModalScreen extends React.Component<Props, State> {
  

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: "",
      errorMessage: ""
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = e => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case BACK_BUTTON:
        this.props.navigator.dismissModal();
    }
  };


  protected onPress = (cityId: string) => {
    this.props.onPress(cityId);
    this.props.navigator.dismissModal();
  };

  private handleChangeText = (name: string) => {
    this.setState({ name });
  };


  private renderCityList = () => {
    const { name } = this.state;
    return (
      <CityListQuery variables={{ name }}>
        {({ data, error, loading }) => {
          if (loading) {
            //return this.setState({loading});
            return (
              <View>
                <Text>Loading</Text>
              </View>
            );
          }
          if (error) {
            return (
              <View>
                <Text>{error}</Text>
              </View>
            );
            //return this.setState({errorMessage: error});
          }
          const { cityList } = data;
          return (
            <CityList cities={cityList} onPress={this.onPress} />
          );
        }}
      </CityListQuery>
    );
  };

  private renderTextForm = () => {
    const { name } = this.state;
    console.log(name);
    return <CityInput name={name} onChangeText={this.handleChangeText} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderTextForm()}
        {this.renderCityList()}
      </View>
    );
  }
}

export default CitySearchModalScreen;
