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
// how to change data in screen level? async loading project is annoying
// for project search
//-> use only city name
// for project edit and user edit
// 1. add button to get city name by geolocation(reverse geocodint https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding)
//-> store gelolocation and city name
// 2. allow inputting  get city name by addreaa
// -> store geolocaiton,  city name
// 3. allow city name by autocomplete
// how to get all the city list -> create address with official data and improve it with google map api result
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


  private onPress = (cityId: string) => {
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
