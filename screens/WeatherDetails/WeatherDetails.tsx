import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { kelvinToCelsiusConverter } from '../../utils/kelvinToCelsiusConverter';
import { styles } from './styles';
import MainLayout from '../../layouts/MainLayout';
import { useWeatherStore } from '../../store/weatherStore';
import { useEffect, useState } from 'react';
import { getWeatherForecast } from '../../services/weatherService';

const WeatherDetails = () => {
  const { city } = useWeatherStore(state => ({
    city: state.city,
  }));
  const [forecast, setForecast] = useState<any[]>([]);
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

  // const fetchWeatherForecast = async () => {
  //   try {
  //     const response = await axios.get(BASE_URL, {
  //       params: {
  //         lat,
  //         lon,
  //         appid: API_KEY,
  //         units: 'metric',
  //       },
  //     });
  //     const processedData = processForecastData(response.data.list);
  //     setForecast(processedData);
  //     setLoading(false);
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to fetch weather forecast');
  //     setLoading(false);
  //   }
  // };

  const renderForecastItem = ({ item }: { item: any }) => {
    if (!item) {
      return null;
    }
    const date = new Date(item.dt * 1000);

    return (
      <View style={styles.forecastTile}>
        <Image
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
          style={styles.image}
        />
        <View>
          <Text style={styles.dateText}>{date.toDateString()}</Text>
          <Text style={styles.tempText}>
            Temp: {kelvinToCelsiusConverter(item.main.temp)}°C
          </Text>
          <Text style={styles.conditionText}>
            Condition: {item.weather[0].description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={forecast}
            renderItem={renderForecastItem}
            keyExtractor={item => item.dt.toString()}
          />
        )}
      </View>
    </MainLayout>
  );
};

export default WeatherDetails;
