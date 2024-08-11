import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import { useWeatherStore } from '../../store/weatherStore';
import { useEffect, useState } from 'react';
import { getWeatherForecast } from '../../services/weatherService';
import { GetForecastListDto } from '../../types';
import ForecastItem from './ForecastItem';
import { styles } from './styles';

const WeatherDetails = () => {
  const { city } = useWeatherStore(state => ({
    city: state.city,
  }));
  const [forecast, setForecast] = useState<GetForecastListDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!city.length) {
      return;
    }

    const getWeatherForecastData = async () => {
      try {
        const weatherForecastData = await getWeatherForecast(city);
        console.log(weatherForecastData);
        setForecast(weatherForecastData);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getWeatherForecastData();
  }, []);

  return (
    <MainLayout>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.container}>
            <Text style={styles.cityNameText}>{city.toUpperCase()}</Text>
            <FlatList
              data={forecast}
              renderItem={ForecastItem}
              keyExtractor={item => item.dt.toString()}
              overScrollMode="never"
              contentContainerStyle={styles.forecastList}
            />
          </View>
        )}
      </View>
    </MainLayout>
  );
};

export default WeatherDetails;
