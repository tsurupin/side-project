import * as React from "react";
import { View, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  CityList,
  CityInput
} from "../../../components/Discovery/CitySearchModalScreen";
import { BACK_BUTTON } from "../../../constants/buttons";
import { CityListQuery } from "../../../queries/cities";
import { CityMutation } from "../../../mutations/cities";
import { City, CityEditParams } from "../../../interfaces";
import { fetchAddress } from "../../../utilities/geocoder";
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
  needLocationSearch: boolean;
  onPress: (city: City) => void;
};

type State = {
  loading: boolean;
  name: string | undefined;
  errorMessage: string;
};

class CitySearchModalScreen extends React.Component<Props, State> {
  static defaultProps = {
    needLocationSearch: false
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: undefined,
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

  private onPress = (city: City) => {
    this.props.onPress(city);
    this.props.navigator.dismissModal();
  };

  private handleChangeText = (name: string) => {
    this.setState({ name });
  };

  private handlePressCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;

      try {
        const data = await fetchAddress(latitude, longitude);
        if (data.address) {
          const { address } = data;

          const cityParams: CityEditParams = {
            name: address.cityName,
            stateName: address.stateName,
            stateAbbreviation: address.stateAbbreviation,
            countryName: address.countryName
          };


        }
      } catch (e) {
        console.log("geocode failed", e);
      }
      // .then(() => console.log("success"))
      // .catch((e) => console.log(e))

      //location = geolocation.get(porition);
      //const cityEditParams = {name: location.name, stateName: location.stateName, stateAbbreviation: location.stateAbbreviation}
      //if city exists, return id and the fullName. Otherwise, create the city with that data
      // this.props.onPress(city, position.longitude, position.latitude)
      // his.props.navigator.dismissModal();
    });
  };

  private renderCityList = () => {
    const { name } = this.state;
    if (!name) return <View />;
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
          return <CityList cities={cityList} onPress={this.onPress} />;
        }}
      </CityListQuery>
    );
  };

  private renderCurrentLocationButtton = (): undefined | JSX.Element => {
    if (!this.props.needLocationSearch) return undefined;
    return (
      <Button
        title="Current Location"
        onPress={this.handlePressCurrentLocation}
      />
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
        {this.renderCurrentLocationButtton()}
        {this.renderCityList()}
      </View>
    );
  }
}

export default CitySearchModalScreen;
