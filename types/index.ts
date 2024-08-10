type CoordDto = {
  lon: number;
  lat: number;
};

type WeatherDto = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type WeatherDetailsDto = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type WindDto = {
  speed: number;
  deg: number;
  gust: number;
};

type RainDto = {
  '1h': number;
  '3h': number;
};

type CloudsDto = {
  all: number;
};

type SysDto = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type GetWeatherDataDto = {
  coord: CoordDto;
  weather: WeatherDto[];
  base: string;
  main: WeatherDetailsDto;
  visibility: number;
  wind: WindDto;
  rain: RainDto;
  clouds: CloudsDto;
  dt: number;
  sys: SysDto;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type GetCoordsDto = {
  country: string;
  lat: string;
  local_names: Record<string, string>;
  lon: number;
  name: string;
  state: string;
};
