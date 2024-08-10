import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getCityCords } from '../../services/weatherService';
import { GetWeatherDataDto } from '../../types';
import { kelvinToCelsiusConverter } from '../../utils/kelvinToCelsiusConverter';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from '../../types/enums';

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<GetWeatherDataDto | null>(null);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleSearch = async () => {
    if (city.trim() === '') {
      Alert.alert('Input Error', 'Please enter a city name.');
      return;
    }

    try {
      const weatherData = await getCityCords(city);
      setWeather(weatherData);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Input Error', 'Please enter a valid city name.');
      }
    }
  };

  const handleSaveFavoriteCity = async () => {
    try {
      await AsyncStorage.setItem(AsyncStorageKey.FavoriteCity, city);
      Alert.alert('Input Error', 'Successfully added city to favorite!');
    } catch (error) {
      Alert.alert('Input Error', 'Cannot add city to favorite.');
    }
  };

  useEffect(() => {
    const handleCheckFavoriteCity = async () => {
      const favoriteCity = await AsyncStorage.getItem(
        AsyncStorageKey.FavoriteCity,
      );

      if (!favoriteCity) {
        return;
      }
      const weatherData = await getCityCords(favoriteCity);
      setWeather(weatherData);
      setCity(favoriteCity);
    };

    handleCheckFavoriteCity();
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.description}>
          Enter the name of a city below to fetch the current weather data.
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
          <Button title="Get Weather" onPress={handleSearch} color={'red'} />
        </View>
        {weather && (
          <View style={styles.weatherContainer}>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              style={styles.image}
            />
            <Text style={styles.weatherText}>
              Temperature: {kelvinToCelsiusConverter(weather.main.temp)}°C
            </Text>
            <Text style={styles.weatherText}>
              Condition: {weather.weather[0].description}
            </Text>
            <Text style={styles.weatherText}>
              Humidity: {weather.main.humidity}%
            </Text>
            <Text style={[styles.weatherText, styles.marginBottom]}>
              Wind Speed: {weather.wind.speed} m/s
            </Text>
            <Button
              title="Add City to Favorite"
              onPress={handleSaveFavoriteCity}
              color={'red'}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
