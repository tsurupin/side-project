import * as React from "react";
import { View, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  CityList,
  CityInput
} from "../../../components/Discovery/CitySearchModalScreen";
import { BACK_BUTTON } from "../../../constants/buttons";
import { CityListQuery } from "../../../queries/cities";
import { FindOrCreateCityMutation } from "../../../mutations/cities";
import { City, CityEditParams } from "../../../interfaces";
import { fetchAddress } from "../../../utilities/geocoder";
import styles from "./styles";

type Props = {
  navigator?: any;
  needLocationSearch: boolean;
  onPress: (city: City, longtitude?: number, latitude?: number) => void;
};

type State = {
  loading: boolean;
  name: string | undefined;
  longitude?: number | undefined;
  latitude?: number | undefined;
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

  private handlePressCurrentLocation = findOrCreateCityMutation => {
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
          this.setState({longitude: address.longitude, latitude: address.latitude});
          findOrCreateCityMutation({ variables: cityParams });
        }
      } catch (e) {
        console.log("geocode failed", e);
      }
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
      <FindOrCreateCityMutation>
        {({ findOrCreateCityMutation, data, loading, error }) => {
          if (loading) return <View />;
          if (error) {
            console.log("FindOrCreateCityMutationError", error);
            return <View />;
          }
          if (data) {
            const city: City = data.findOrCreateCity;
            this.props.onPress(city, this.state.longitude, this.state.latitude);
            this.props.navigator.dismissModal();
          }
          return (
            <Button
              title="Current Location"
              onPress={() =>
                this.handlePressCurrentLocation(findOrCreateCityMutation)
              }
            />
          );
        }}
      </FindOrCreateCityMutation>
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
