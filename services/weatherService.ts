import axios from 'axios';
import { GetWeather } from '../types';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.BASE_URL;

export const getCityCords = async (city: string) => {
  // const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${WEATHER_API_KEY}`;
  // const url = `http://api.openweathermap.org/geo/1.0/direct?q=Kielce&appid=${WEATHER_API_KEY}`;
  // try {
  //   console.log(WEATHER_API_KEY);
  //   const response = await axios.get(url);
  //   return response.data;
  // } catch (error) {
  //   console.error('Error fetching weather data:', error);
  //   throw error;
  // }
  console.log(WEATHER_API_KEY);
};

export const getWeather = async ({ city, lat, lon }: GetWeather) => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
