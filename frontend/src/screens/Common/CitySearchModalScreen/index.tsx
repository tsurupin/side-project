import * as React from 'react';
import { View, Text, Button } from 'react-native';

import { CityList } from '../../../components/Common/CitySearchModalScreen';
import { CLOSE_BUTTON } from '../../../constants/buttons';
import { CityListQuery } from '../../../queries/cities';
import { SearchInput, ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { FindOrCreateCityMutation } from '../../../mutations/cities';
import { City, CityEditParams, GraphQLErrorMessage } from '../../../interfaces';
import { fetchAddress } from '../../../utilities/geocoder';
import styles from './styles';

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

type CityMutation = {
  variables: CityEditParams;
};

type CityListData = {
  cityList: City[];
};

type CityData = {
  findOrCreateCity: City;
};

type CityListOutput = {
  data: CityListData | undefined;
  loading: boolean;
  error: GraphQLErrorMessage | undefined;
};

type FindOrCreateCityMutationOutput = {
  findOrCreateCityMutation: (input: CityMutation) => void;
  data: CityData | undefined;
  loading: boolean;
  error: GraphQLErrorMessage | undefined;
};

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

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') return;

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

  private handlePressCurrentLocation = (findOrCreateCityMutation: ({ variables }: CityMutation) => void) => {
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
  }

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
            return <ErrorMessage {...error} />;
          }
          const cityList = data!.cityList;
          return <CityList cities={cityList} onPress={this.onPress} />;
        }}
      </CityListQuery>
    );
  }

  private renderCurrentLocationButtton = (): undefined | JSX.Element => {
    if (!this.props.needLocationSearch) return undefined;
    const { onPress, navigator } = this.props;
    return (
      <FindOrCreateCityMutation>
        {({ findOrCreateCityMutation, data, loading, error }: FindOrCreateCityMutationOutput) => {
          if (loading) return <View />;
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
              onPress={() => this.handlePressCurrentLocation(findOrCreateCityMutation)}
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
