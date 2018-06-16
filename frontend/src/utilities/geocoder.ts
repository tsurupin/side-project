import {
  GOOGLE_MAP_API_KEY,
} from "../config";
const GOOGLE_MAP_REVERSE_GEOCIDING_API = "https://maps.googleapis.com/maps/api/geocode/json";

export const fetchAddress = async (latitude: number, longitude: number) => {
  const url = `${GOOGLE_MAP_REVERSE_GEOCIDING_API}?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API_KEY}`;
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.error(error);
  }
};