import { GOOGLE_MAP_API_KEY } from '../config';
const GOOGLE_MAP_REVERSE_GEOCIDING_API =
  'https://maps.googleapis.com/maps/api/geocode/json';

const STREET_ADDRESS_TYPE = 'street_address';
const AREA_TYPE = 'administrative_area_level_1';
const LOCAL_TYPE = 'locality';
const POSTAL_CODE_TYPE = 'postal_code';
const COUNTRY_TYPE = 'country';
type AddressComponent = {
  types: string[];
  long_name: string;
  short_name: string;
};
type Geometry = {
  location: { lat: number; lng: number };
  location_type: string;
  viewport: Object;
};
type StreetAddress = {
  address_components: AddressComponent[];
  formatted_address: Object;
  geometry: Geometry;
  place_id: string;
  types: string[];
};

type Address = {
  latitude: number;
  longitude: number;
  postalCode: string;
  stateName: string;
  stateAbbreviation: string;
  cityName: string;
  countryName: string;
};

export const fetchAddress = async (
  latitude: number,
  longitude: number,
): Promise<{ result: boolean; address?: Address; error?: any }> => {
  const url = `${GOOGLE_MAP_REVERSE_GEOCIDING_API}?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API_KEY}`;
  try {
    const response = await fetch(url);
    const { results } = await response.json();

    const streetAddress: StreetAddress = results.filter(({ types }) =>
      types.includes(STREET_ADDRESS_TYPE),
    )[0];

    let postalCode;
    let stateName;
    let stateAbbreviation;
    let cityName;
    let countryName;
    streetAddress.address_components.forEach(
      ({ types, long_name, short_name }) => {
        if (types.includes(POSTAL_CODE_TYPE)) {
          postalCode = long_name;
        } else if (types.includes(AREA_TYPE)) {
          stateName = long_name;
          stateAbbreviation = short_name;
        } else if (types.includes(LOCAL_TYPE)) {
          cityName = long_name;
        } else if (types.includes(COUNTRY_TYPE)) {
          countryName = long_name;
        }
      },
    );

    const { lat, lng } = streetAddress.geometry.location;

    return {
      result: true,
      address: {
        latitude: lat,
        longitude: lng,
        postalCode,
        stateName,
        stateAbbreviation,
        cityName,
        countryName,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      result: false,
      error,
    };
  }
};
