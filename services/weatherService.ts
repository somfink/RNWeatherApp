import axios from 'axios';
import Config from 'react-native-config';
import { GetCoordsDto, GetWeatherDataDto } from '../types';

const WEATHER_API_KEY = Config.WEATHER_API_KEY;

export const getCityCords = async (city: string) => {
  const getCordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${WEATHER_API_KEY}`;

  const cordsResponse = await axios.get<GetCoordsDto[]>(getCordsUrl);
  const { lat, lon } = cordsResponse?.data[0] || {};

  const getWeatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  const weatherResponse = await axios.get<GetWeatherDataDto>(getWeatherDataUrl);
  return weatherResponse.data;
};
