import { GetForecastListDto, GetWeatherDataDto } from '../types';

export const processForecastData = (data: GetForecastListDto[]) => {
  const dailyForecasts: any[] = [];
  const noonHour = 12;

  // Group data by day
  const groupedByDay: Record<string, GetForecastListDto[]> = data.reduce(
    (acc: Record<string, GetForecastListDto[]>, curr: GetForecastListDto) => {
      const date = new Date(curr.dt * 1000);
      const day = date.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(curr);
      return acc;
    },
    {},
  );

  // Pick the forecast closest to noon for each day
  Object.values(groupedByDay).forEach((dayData: any) => {
    const noonForecast = dayData.reduce(
      (
        closest: Pick<GetWeatherDataDto, 'dt'>,
        current: Pick<GetWeatherDataDto, 'dt'>,
      ) => {
        const currentDate = new Date(current.dt * 1000);
        const currentHour = currentDate.getHours();
        const closestDate = new Date(closest.dt * 1000);
        const closestHour = closestDate.getHours();

        return Math.abs(currentHour - noonHour) <
          Math.abs(closestHour - noonHour)
          ? current
          : closest;
      },
    );
    dailyForecasts.push(noonForecast);
  });

  // Limit to 5 days
  return dailyForecasts.slice(0, 5);
};
