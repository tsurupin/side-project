import * as React from 'react';
import { Button, Text, View } from 'react-native';

import {
  ErrorMessage,
  LoadingIndicator,
  SearchInput,
} from '../../../components/Common';
import { CityList } from '../../../components/Common/CitySearchModalScreen';
import { CLOSE_BUTTON } from '../../../constants/buttons';
import { City, CityEditParams } from '../../../interfaces';
import { FindOrCreateCityMutation } from '../../../mutations/cities';
import { CityListQuery } from '../../../queries/cities';
import { fetchAddress } from '../../../utilities/geocoder';
import styles from './styles';

interface Props {
  navigator?: any;
  needLocationSearch: boolean;
  onPress: (city: City, longtitude?: number, latitude?: number) => void;
}

interface State {
  loading: boolean;
  name: string | undefined;
  longitude?: number | undefined;
  latitude?: number | undefined;
  errorMessage: string;
}

class CitySearchModalScreen extends React.Component<Props, State> {
  public static defaultProps = {
    needLocationSearch: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: undefined,
      errorMessage: '',
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  public render() {
    return (
      <View style={styles.container}>
        {this.renderTextForm()}
        {this.renderCurrentLocationButtton()}
        {this.renderCityList()}
      </View>
    );
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') { return; }

    switch (e.id) {
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
    }
  }

  private onPress = (city: City) => {
    this.props.onPress(city);
    this.props.navigator.dismissModal();
  }

  private handleChangeText = (name: string) => {
    this.setState({ name });
  }

  private handlePressCurrentLocation = (findOrCreateCityMutation) => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;

      try {
        const data = await fetchAddress(latitude, longitude);
        if (data.address) {
          const { address } = data;
          console.log(address);

          const cityParams: CityEditParams = {
            name: address.cityName,
            stateName: address.stateName,
            stateAbbreviation: address.stateAbbreviation,
            countryName: address.countryName,
          };
          this.setState({
            longitude: address.longitude,
            latitude: address.latitude,
          });
          findOrCreateCityMutation({ variables: cityParams });
        }
      } catch (e) {
        console.log('geocode failed', e);
      }
    });
  }

  private renderCityList = () => {
    const { name } = this.state;
    if (!name) { return <View />; }
    return (
      <CityListQuery variables={{ name }}>
        {({ data, error, loading }) => {
          if (loading) {
            return <LoadingIndicator />;
          }
          if (error) {
            return <ErrorMessage {...error} />;
          }
          const { cityList } = data;
          return <CityList cities={cityList} onPress={this.onPress} />;
        }}
      </CityListQuery>
    );
  }

  private renderCurrentLocationButtton = (): undefined | JSX.Element => {
    if (!this.props.needLocationSearch) { return undefined; }
    const { onPress, navigator } = this.props;
    return (
      <FindOrCreateCityMutation>
        {({ findOrCreateCityMutation, data, loading, error }) => {
          if (loading) { return <View />; }
          if (error) {
            console.log('FindOrCreateCityMutationError', error);
            return <View />;
          }
          if (data) {
            const city: City = data.findOrCreateCity;
            const { longitude, latitude } = this.state;
            onPress(city, longitude, latitude);
            navigator.dismissModal();
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
  }
  private renderTextForm = () => {
    const { name } = this.state;
    return <SearchInput name={name} onChangeText={this.handleChangeText} />;
  }
}

export default CitySearchModalScreen;
