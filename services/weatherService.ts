import axios from 'axios';
import Config from 'react-native-config';
import {
  GetCoordsDataDto,
  GetForecastDataDto,
  GetWeatherDataDto,
} from '../types';
import { processForecastData } from '../utils/processForecastData';

const WEATHER_API_KEY = Config.WEATHER_API_KEY;

const getCityCoords = async (city: string) => {
  const getCoordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${WEATHER_API_KEY}`;

  const cordsResponse = await axios.get<GetCoordsDataDto[]>(getCoordsUrl);
  return cordsResponse?.data[0];
};

export const getTodayWeather = async (city: string) => {
  const { lat, lon } = await getCityCoords(city);

  const getWeatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  const weatherResponse = await axios.get<GetWeatherDataDto>(getWeatherDataUrl);
  return weatherResponse.data;
};

export const getWeatherForecast = async (city: string) => {
  const { lat, lon } = await getCityCoords(city);

  const getForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  const response = await axios.get<GetForecastDataDto>(getForecastUrl);
  return processForecastData(response.data.list);
};
