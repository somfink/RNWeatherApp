import { create } from 'zustand';
import { GetWeatherDataDto } from '../types';

type WeatherStore = {
  city: string;
  weather: GetWeatherDataDto | null;
  setWeather: (weather: GetWeatherDataDto) => void;
  setCityName: (city: string) => void;
};

const initialState = {
  city: '',
  weather: null,
};

export const useWeatherStore = create<WeatherStore>(set => ({
  ...initialState,
  setWeather: weather => set({ weather }),
  setCityName: city => set({ city }),
}));
