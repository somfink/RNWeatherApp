type GetCoordsDto = {
  lon: number;
  lat: number;
};

type GetWeatherDto = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type GetWeatherDetailsDto = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type GetWindDto = {
  speed: number;
  deg: number;
  gust: number;
};

type GetRainDto = {
  '1h': number;
  '3h': number;
};

type GetCloudsDto = {
  all: number;
};

type GetSysWeatherDto = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type GetWeatherDataDto = {
  coord: GetCoordsDto;
  weather: GetWeatherDto[];
  base: string;
  main: GetWeatherDetailsDto;
  visibility: number;
  wind: GetWindDto;
  rain: GetRainDto;
  clouds: GetCloudsDto;
  dt: number;
  sys: GetSysWeatherDto;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type GetCoordsDataDto = {
  country: string;
  lat: string;
  local_names: Record<string, string>;
  lon: number;
  name: string;
  state: string;
};

type GetSysForecastDto = {
  pod: 'd' | 'n';
};

export type GetForecastListDto = {
  dt: number;
  main: GetWeatherDetailsDto & {
    temp_kf: -1.11;
  };
  weather: GetWeatherDto[];
  clouds: GetCloudsDto;
  wind: GetWindDto;
  visibility: number;
  pop: number;
  rain: GetRainDto;
  sys: GetSysForecastDto;
  dt_txt: string;
};

type GetCityForecastDto = Omit<GetSysWeatherDto, 'type'> & {
  name: string;
  coord: GetCoordsDto;
  population: number;
  timezone: number;
};

export type GetForecastDataDto = {
  cod: string;
  massage: number;
  cnt: number;
  list: GetForecastListDto[];
  city: GetCityForecastDto;
};
