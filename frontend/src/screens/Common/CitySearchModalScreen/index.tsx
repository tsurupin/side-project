import * as React from 'react';
import { View, Button, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { CityList } from '../../../components/Common/CitySearchModalScreen';
import { CLOSE_BUTTON } from '../../../constants/buttons';
import { CityListQuery } from '../../../queries/cities';
import { SearchInput, LoadingIndicator } from '../../../components/Common';
import { FindOrCreateCityMutation } from '../../../mutations/cities';
import { City, CityEditParams, MinimumOutput } from '../../../interfaces';
import { fetchAddress } from '../../../utilities/geocoder';
import styles from './styles';

type Props = {
  navigator?: any;
  needLocationSearch: boolean;
  componentId: string;
  onPress: (city: City, longtitude?: number, latitude?: number) => void;
};

type State = {
  loading: boolean;
  name: string | undefined;
  longitude?: number | undefined;
  latitude?: number | undefined;
  errorMessage: string;
};

type CityListOutput = {
  data: { cityList: City[] } | undefined;
} & MinimumOutput;

type FindOrCreateCityMutationOutput = {
  findOrCreateCityMutation: (input: { variables: CityEditParams }) => void;
  data: { findOrCreateCity: City } | undefined;
} & MinimumOutput;

class CitySearchModalScreen extends React.Component<Props, State> {
  static defaultProps = {
    needLocationSearch: false
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
      name: undefined,
      errorMessage: ''
    };

    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case CLOSE_BUTTON:
        Navigation.dismissModal(this.props.componentId);
    }
  };

  private onPress = (city: City) => {
    this.props.onPress(city);
    Navigation.dismissModal(this.props.componentId);
  };

  private handleChangeText = (name: string) => {
    this.setState({ name });
  };

  private handlePressCurrentLocation = (findOrCreateCityMutation: (input: { variables: CityEditParams }) => void) => {
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
          this.setState({
            longitude: address.longitude,
            latitude: address.latitude
          });
          findOrCreateCityMutation({ variables: cityParams });
        }
      } catch (e) {
        console.log('geocode failed', e);
      }
    });
  };

  private renderCityList = () => {
    const { name } = this.state;
    if (!name) return <View />;
    return (
      <CityListQuery variables={{ name }}>
        {({ data, error, loading }: CityListOutput) => {
          if (loading) {
            return <LoadingIndicator />;
          }
          if (error) {
            Alert.alert(error.message);
          }
          const cityList = data!.cityList;
          return <CityList cities={cityList} onPress={this.onPress} />;
        }}
      </CityListQuery>
    );
  };

  private renderCurrentLocationButtton = (): undefined | JSX.Element => {
    if (!this.props.needLocationSearch) return undefined;
    const { onPress } = this.props;
    return (
      <FindOrCreateCityMutation>
        {({ findOrCreateCityMutation, data, loading, error }: FindOrCreateCityMutationOutput) => {
          if (loading) return <View />;
          if (error) {
            Alert.alert(error.message);
          }
          if (data) {
            const city: City = data.findOrCreateCity;
            const { longitude, latitude } = this.state;
            onPress(city, longitude, latitude);
            Navigation.dismissModal(this.props.componentId);
          }
          return (
            <Button
              title="Current Location"
              onPress={() => this.handlePressCurrentLocation(findOrCreateCityMutation)}
            />
          );
        }}
      </FindOrCreateCityMutation>
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
        {this.renderCurrentLocationButtton()}
        {this.renderCityList()}
      </View>
    );
  }
}

export default CitySearchModalScreen;
