import axios from 'axios';
import { GetWeather } from '../types';
import Config from 'react-native-config';

const WEATHER_API_KEY = Config.WEATHER_API_KEY;

export const getCityCords = async (city: string) => {
  const getCordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${WEATHER_API_KEY}`;

  try {
    const cordsResponse = await axios.get(getCordsUrl);

    const { lat, lon } = cordsResponse.data[0];
    const getWeatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

    const weatherResponse = await axios.get(getWeatherDataUrl);
    return weatherResponse.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
